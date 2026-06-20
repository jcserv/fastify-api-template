import Fastify, { type FastifyInstance, type FastifyServerOptions } from "fastify";
import Routes from "./routes/index.ts";

function build(opts: FastifyServerOptions = {}): FastifyInstance {
  const app = Fastify(opts);
  app.register(Routes);
  return app;
}

export default build;
