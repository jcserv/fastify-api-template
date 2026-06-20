const isProduction = process.env.NODE_ENV === "production";

export const config = {
  isProduction,
  host: process.env.HOST ?? "0.0.0.0",
  port: Number(process.env.PORT ?? 3000),
  logLevel: process.env.LOG_LEVEL ?? "info",
};

if (Number.isNaN(config.port)) {
  throw new Error(`Invalid PORT: ${process.env.PORT}`);
}
