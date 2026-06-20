import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import type { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { pool } from "../db.ts";
import { BookService } from "../service/book.ts";

const bookBody = {
  type: "object",
  required: ["title", "author_id"],
  properties: {
    title: { type: "string" },
    author_id: { type: "number" },
  },
} as const;

const idParams = {
  type: "object",
  required: ["id"],
  properties: { id: { type: "number" } },
} as const;

async function bookRoutes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
  const app = fastify.withTypeProvider<JsonSchemaToTsProvider>();
  const books = new BookService(pool);

  app.get("/books", async () => {
    return books.readBooks();
  });

  app.get("/books/:id", { schema: { params: idParams } }, async (request, reply) => {
    const book = await books.readBook(request.params.id);
    if (!book) return reply.code(404).send({ message: "book not found" });
    return book;
  });

  app.post("/books", { schema: { body: bookBody } }, async (request, reply) => {
    const book = await books.createBook(request.body);
    return reply.code(201).send(book);
  });

  app.put(
    "/books/:id",
    { schema: { params: idParams, body: bookBody } },
    async (request, reply) => {
      await books.updateBook({ id: request.params.id, ...request.body });
      return reply.code(204).send();
    },
  );

  app.delete("/books/:id", { schema: { params: idParams } }, async (request, reply) => {
    await books.deleteBook(request.params.id);
    return reply.code(204).send();
  });
}

export default bookRoutes;
