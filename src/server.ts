import build from "./app.ts";
import { config } from "./config.ts";

const server = build({
  logger: {
    level: config.logLevel,
    ...(config.isProduction ? {} : { transport: { target: "pino-pretty" } }),
  },
});

const start = async () => {
  try {
    await server.listen({ host: config.host, port: config.port });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

// Drain in-flight requests before exiting on orchestrator/CTRL-C signals.
const shutdown = async (signal: string) => {
  server.log.info({ signal }, "shutting down");
  try {
    await server.close();
    process.exit(0);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

for (const signal of ["SIGTERM", "SIGINT"] as const) {
  process.on(signal, () => void shutdown(signal));
}

void start();
