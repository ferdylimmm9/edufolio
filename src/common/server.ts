import { decamelizeKeys } from 'humps';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
import { customAlphabet } from 'nanoid';
import { NextApiRequest, NextApiResponse } from 'next';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

export function parseValidationError(validationError: string) {
  const errors = JSON.parse(validationError)?.inner?.map((err) => {
    return {
      name: err.path,
      message: err.message,
    };
  });
  return errors;
}

export function generateId(size = 10) {
  return nanoid(size);
}

export function getFilterDate(date: string | undefined): Date | undefined {
  if (!date) return;

  const result = new Date(date.substring(0, 10)).toISOString();
  return new Date(result);
}

export function getDate(date: Date) {
  const str = date.toISOString().substring(0, 10);
  return new Date(str);
}

export function generateAccessToken(data) {
  const token = sign(decamelizeKeys(data), 'test', {
    expiresIn: '60 days',
  });

  return token;
}

export function verifyToken(token: string) {
  const decoded = jwtDecode<JwtPayload>(token);
  return decoded;
}

export function verifyBearerToken(bearer: string = '') {
  try {
    const [, token] = bearer.split(' ');
    if (!token) return false;
    const decoded = verify(token, 'test') as JwtPayload;
    return decoded;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export function isTokenExpired(exp: number = -1) {
  try {
    const expiredAt = new Date(exp * 1000).getTime();
    const currentDate = new Date().getTime();
    return currentDate > expiredAt;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function middleware(
  request: NextApiRequest,
  response: NextApiResponse,
  isAdmin = false,
) {
  try {
    const token = request.headers.authorization;
    const user = verifyBearerToken(token);

    if (user) {
      const tokenExpired = isTokenExpired(user.exp);
      if (tokenExpired) {
        response.status(401).json({
          message: 'Sesi anda telah selesai, mohon untuk login kembali',
        });
        return response.end();
      }

      if (user.type === 'user' && isAdmin) {
        response.status(401).json({
          message: 'Anda tidak diizinkan memakai fitur ini',
        });
        return response.end();
      }

      return user;
    } else {
      response.status(401).json({
        message: 'Unauthorized',
      });
      return response.end();
    }
  } catch (e) {
    response.status(500).json({
      message: e.message,
    });
    return response.end();
  }
}
