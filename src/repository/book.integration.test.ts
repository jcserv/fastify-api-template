import { describe, it, expect, afterAll } from "vitest";
import { Pool } from "pg";
import { createBook, readBook, readBooks, updateBook, deleteBook } from "./book.ts";

const DATABASE_URL = process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/app";

describe.skipIf(!process.env.RUN_DB_TESTS)("book repository (integration)", () => {
  const pool = new Pool({ connectionString: DATABASE_URL });
  let createdId: number | undefined;

  afterAll(async () => {
    if (createdId !== undefined) {
      await pool.query("DELETE FROM Book WHERE id = $1", [createdId]);
    }
    await pool.end();
  });

  it("round-trips CRUD against real Postgres", async () => {
    const created = await createBook(pool, { title: "Integration Title", author_id: 1 });
    createdId = created.id;
    expect(created.title).toBe("Integration Title");
    expect(created.author_id).toBe(1);

    const fetched = await readBook(pool, created.id);
    expect(fetched).toEqual(created);

    const all = await readBooks(pool);
    expect(all.some((b) => b.id === created.id)).toBe(true);

    await updateBook(pool, { id: created.id, title: "Updated Title", author_id: 1 });
    const updated = await readBook(pool, created.id);
    expect(updated?.title).toBe("Updated Title");

    await deleteBook(pool, created.id);
    const gone = await readBook(pool, created.id);
    expect(gone).toBeUndefined();
    createdId = undefined;
  });
});
