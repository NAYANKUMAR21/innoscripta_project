// config/env.ts

// Validate environment variables
export const getEnvVar = (key: string): string => {
  const value = import.meta.env[`${key}`];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};
