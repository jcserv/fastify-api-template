export interface Author {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  title: string;
  author_id: number;
}
