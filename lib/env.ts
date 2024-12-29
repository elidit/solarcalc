// Environment variable validation
export function getRequiredEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. Please connect to Supabase to configure your environment variables.`
    );
  }
  return value;
}