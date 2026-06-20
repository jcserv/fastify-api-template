import Fastify from "fastify";
import Routes from "./routes/index.ts";

const fastify = Fastify({
  logger: true,
});

fastify.register(Routes);

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
