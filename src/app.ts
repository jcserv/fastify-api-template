import Fastify, { type FastifyServerOptions } from "fastify";
import Routes from "./routes/index.ts";

function build(opts: FastifyServerOptions = {}) {
  const app = Fastify(opts);
  app.register(Routes);
  return app;
}

export default build;
