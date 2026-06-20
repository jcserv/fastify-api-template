import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import type { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import bookRoutes from "./books.ts";

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

  app.register(bookRoutes);
}

export default routes;
