// Purpose: Get environment variables from the .env file

export const getEnvVar = (key: string): string => {
  const value = import.meta.env[`${key}`];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};
