import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import { postOpts } from "./types.ts";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  fastify.post("/", postOpts, async (request, reply) => {
    return { hello: "world" };
  });
}

export default routes;
