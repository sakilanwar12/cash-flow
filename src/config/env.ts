import dotenv from "dotenv";

dotenv.config();
interface EnvConfig {
  PORT: string;
  DB_URL: string;
  FRONTEND_URL: string;
  NODE_ENV: string
}
const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariables: string[] = ["PORT", "DB_URL","FRONTEND_URL","NODE_ENV"];

  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing require environment variable ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
    NODE_ENV: process.env.NODE_ENV as string
  };
};

export const envVars = loadEnvVariables();
