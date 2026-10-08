import { existsSync } from 'node:fs';
import { loadEnvFile } from 'node:process';
import { resolve } from 'node:path';

const DEFAULT_BASE_URL = 'https://pw-practice-dev.playwrightvn.com';
const envFile = resolve(__dirname, '..', '.env');

if (existsSync(envFile)) {
  loadEnvFile(envFile);
}

export const environment = {
  baseURL: process.env.BASE_URL || DEFAULT_BASE_URL,
};

export function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}
