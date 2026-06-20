import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import type { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { postOpts } from "./types.ts";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
  const app = fastify.withTypeProvider<JsonSchemaToTsProvider>();

  app.get("/health", async (_request, _reply) => {
    return { status: "ok" };
  });

  app.get("/", async (_request, _reply) => {
    return { hello: "world" };
  });

  app.post("/", postOpts, async (_request, _reply) => {
    // _request.body now typed from postOpts.schema.body
    return { hello: "world" };
  });
}

export default routes;
