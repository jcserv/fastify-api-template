import { describe, it, expect, vi } from "vitest";
import type { Db } from "../db.ts";
import { BookService } from "./book.ts";

function fakeDb(rows: unknown[] = []): Db {
  return { query: vi.fn().mockResolvedValue({ rows }) } as unknown as Db;
}

describe("BookService", () => {
  it("createBook delegates to repo", async () => {
    const row = { id: 1, title: "t", author_id: 2 };
    const db = fakeDb([row]);
    const service = new BookService(db);

    const result = await service.createBook({ title: "t", author_id: 2 });

    expect(db.query).toHaveBeenCalledWith(
      "INSERT INTO Book (title, author_id) VALUES ($1, $2) RETURNING *",
      ["t", 2],
    );
    expect(result).toEqual(row);
  });

  it("readBook delegates to repo", async () => {
    const row = { id: 1, title: "t", author_id: 2 };
    const db = fakeDb([row]);
    const service = new BookService(db);

    const result = await service.readBook(1);

    expect(db.query).toHaveBeenCalledWith("SELECT * FROM Book WHERE id = $1", [1]);
    expect(result).toEqual(row);
  });

  it("readBooks delegates to repo", async () => {
    const rows = [{ id: 1, title: "a", author_id: 2 }];
    const db = fakeDb(rows);
    const service = new BookService(db);

    const result = await service.readBooks();

    expect(db.query).toHaveBeenCalledWith("SELECT * FROM Book");
    expect(result).toEqual(rows);
  });

  it("updateBook delegates to repo", async () => {
    const db = fakeDb();
    const service = new BookService(db);

    await service.updateBook({ id: 5, title: "t", author_id: 2 });

    expect(db.query).toHaveBeenCalledWith(
      "UPDATE Book SET title = $1, author_id = $2 WHERE id = $3",
      ["t", 2, 5],
    );
  });

  it("deleteBook delegates to repo", async () => {
    const db = fakeDb();
    const service = new BookService(db);

    await service.deleteBook(7);

    expect(db.query).toHaveBeenCalledWith("DELETE FROM Book WHERE id = $1", [7]);
  });
});
