import Book from './book.model';

export default interface Author {
  id: number;
  firstName: string;
  lastName: string;
  books: Book[];
}
