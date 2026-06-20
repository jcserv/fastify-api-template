import { describe, it, expect, vi } from "vitest";
import type { Db } from "../db.ts";
import { createBook, readBook, readBooks, updateBook, deleteBook } from "./book.ts";

function fakeDb(rows: unknown[] = []): Db {
  return { query: vi.fn().mockResolvedValue({ rows }) } as unknown as Db;
}

describe("book repository", () => {
  it("createBook inserts and returns row", async () => {
    const row = { id: 1, title: "t", author_id: 2 };
    const db = fakeDb([row]);

    const result = await createBook(db, { title: "t", author_id: 2 });

    expect(db.query).toHaveBeenCalledWith(
      "INSERT INTO Book (title, author_id) VALUES ($1, $2) RETURNING *",
      ["t", 2],
    );
    expect(result).toEqual(row);
  });

  it("readBook returns row", async () => {
    const row = { id: 1, title: "t", author_id: 2 };
    const db = fakeDb([row]);

    const result = await readBook(db, 1);

    expect(db.query).toHaveBeenCalledWith("SELECT * FROM Book WHERE id = $1", [1]);
    expect(result).toEqual(row);
  });

  it("readBook returns undefined when empty", async () => {
    const db = fakeDb([]);

    const result = await readBook(db, 99);

    expect(result).toBeUndefined();
  });

  it("readBooks returns all rows", async () => {
    const rows = [
      { id: 1, title: "a", author_id: 2 },
      { id: 2, title: "b", author_id: 3 },
    ];
    const db = fakeDb(rows);

    const result = await readBooks(db);

    expect(db.query).toHaveBeenCalledWith("SELECT * FROM Book");
    expect(result).toEqual(rows);
  });

  it("updateBook updates with correct params", async () => {
    const db = fakeDb();

    await updateBook(db, { id: 5, title: "t", author_id: 2 });

    expect(db.query).toHaveBeenCalledWith(
      "UPDATE Book SET title = $1, author_id = $2 WHERE id = $3",
      ["t", 2, 5],
    );
  });

  it("deleteBook deletes by id", async () => {
    const db = fakeDb();

    await deleteBook(db, 7);

    expect(db.query).toHaveBeenCalledWith("DELETE FROM Book WHERE id = $1", [7]);
  });
});
