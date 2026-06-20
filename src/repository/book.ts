import type { Db } from "../db.ts";
import type { Book } from "./models.ts";

export interface CreateBookParams {
  title: string;
  author_id: number;
}

export interface UpdateBookParams {
  id: number;
  title: string;
  author_id: number;
}

export async function createBook(db: Db, params: CreateBookParams): Promise<Book> {
  const { rows } = await db.query<Book>(
    "INSERT INTO Book (title, author_id) VALUES ($1, $2) RETURNING *",
    [params.title, params.author_id],
  );
  return rows[0];
}

export async function readBook(db: Db, id: number): Promise<Book | undefined> {
  const { rows } = await db.query<Book>("SELECT * FROM Book WHERE id = $1", [id]);
  return rows[0];
}

export async function readBooks(db: Db): Promise<Book[]> {
  const { rows } = await db.query<Book>("SELECT * FROM Book");
  return rows;
}

export async function updateBook(db: Db, params: UpdateBookParams): Promise<void> {
  await db.query("UPDATE Book SET title = $1, author_id = $2 WHERE id = $3", [
    params.title,
    params.author_id,
    params.id,
  ]);
}

export async function deleteBook(db: Db, id: number): Promise<void> {
  await db.query("DELETE FROM Book WHERE id = $1", [id]);
}
