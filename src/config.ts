const isProduction = process.env.NODE_ENV === "production";

interface Config {
  isProduction: boolean;
  host: string;
  port: number;
  logLevel: string;
  databaseUrl: string;
}

export const config: Config = {
  isProduction,
  host: process.env.HOST ?? "0.0.0.0",
  port: Number(process.env.PORT ?? 3000),
  logLevel: process.env.LOG_LEVEL ?? "info",
  databaseUrl: process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/app",
};

if (Number.isNaN(config.port)) {
  throw new Error(`Invalid PORT: ${process.env.PORT}`);
}
