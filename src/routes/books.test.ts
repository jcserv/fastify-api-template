import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../db.ts", () => ({ pool: { query: vi.fn() }, Db: undefined }));

const { pool } = await import("../db.ts");
const build = (await import("../app.ts")).default;
const query = pool.query as unknown as ReturnType<typeof vi.fn>;

describe("book routes", () => {
  beforeEach(() => {
    query.mockReset();
  });

  it("GET /books lists books", async () => {
    const rows = [{ id: 1, title: "a", author_id: 2 }];
    query.mockResolvedValue({ rows });
    const app = build();

    const response = await app.inject({ method: "GET", url: "/books" });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(rows);
  });

  it("GET /books/:id returns book when found", async () => {
    const row = { id: 1, title: "a", author_id: 2 };
    query.mockResolvedValue({ rows: [row] });
    const app = build();

    const response = await app.inject({ method: "GET", url: "/books/1" });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(row);
  });

  it("GET /books/:id returns 404 when missing", async () => {
    query.mockResolvedValue({ rows: [] });
    const app = build();

    const response = await app.inject({ method: "GET", url: "/books/99" });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({ message: "book not found" });
  });

  it("POST /books creates and returns 201", async () => {
    const row = { id: 1, title: "a", author_id: 2 };
    query.mockResolvedValue({ rows: [row] });
    const app = build();

    const response = await app.inject({
      method: "POST",
      url: "/books",
      payload: { title: "a", author_id: 2 },
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toEqual(row);
  });

  it("PUT /books/:id updates and returns 204", async () => {
    query.mockResolvedValue({ rows: [] });
    const app = build();

    const response = await app.inject({
      method: "PUT",
      url: "/books/1",
      payload: { title: "a", author_id: 2 },
    });

    expect(response.statusCode).toBe(204);
  });

  it("DELETE /books/:id deletes and returns 204", async () => {
    query.mockResolvedValue({ rows: [] });
    const app = build();

    const response = await app.inject({ method: "DELETE", url: "/books/1" });

    expect(response.statusCode).toBe(204);
  });
});
