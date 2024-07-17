import crypto from 'crypto';

export default function generateUniqueId() {
  return crypto.randomBytes(1024).toString('hex');
}
