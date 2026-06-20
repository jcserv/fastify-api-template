import type { Db } from "../db.ts";
import type { Book } from "../repository/models.ts";
import {
  createBook,
  deleteBook,
  readBook,
  readBooks,
  updateBook,
  type CreateBookParams,
  type UpdateBookParams,
} from "../repository/book.ts";

export interface IBookService {
  createBook(params: CreateBookParams): Promise<Book>;
  readBook(id: number): Promise<Book | undefined>;
  readBooks(): Promise<Book[]>;
  updateBook(params: UpdateBookParams): Promise<void>;
  deleteBook(id: number): Promise<void>;
}

export class BookService implements IBookService {
  private readonly repo: Db;

  constructor(repo: Db) {
    this.repo = repo;
  }

  createBook(params: CreateBookParams): Promise<Book> {
    return createBook(this.repo, params);
  }

  readBook(id: number): Promise<Book | undefined> {
    return readBook(this.repo, id);
  }

  readBooks(): Promise<Book[]> {
    return readBooks(this.repo);
  }

  updateBook(params: UpdateBookParams): Promise<void> {
    return updateBook(this.repo, params);
  }

  deleteBook(id: number): Promise<void> {
    return deleteBook(this.repo, id);
  }
}
