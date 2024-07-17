import invariant from 'invariant';

function required(name: string, value?: string): string {
  invariant(value !== undefined, `${name} is required on env vars`);
  return value!;
}

const exportEnv = {
  apiEndpoint: required(
    'NEXT_PUBLIC_API_ENDPOINT',
    process.env.NEXT_PUBLIC_API_ENDPOINT,
  ),
  projectEnv: required(
    'NEXT_PUBLIC_PROJECT_ENV',
    process.env.NEXT_PUBLIC_PROJECT_ENV,
  ),
};

export default exportEnv;
