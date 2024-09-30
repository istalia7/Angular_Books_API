import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import Book from '../models/book.model';
import Author from '../models/author.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://127.0.0.1:8000/api/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}`);
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(
      `${this.apiUrl}`.replace('books', 'authors')
    );
  }

  getDetailBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`.replace('books', 'book'));
  }

  deleteBook(id: number): Observable<Book> {
    return this.http.delete<Book>(
      `${this.apiUrl}/${id}`.replace('books', 'book')
    );
  }

  createBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}`, book);
  }

  // This method work in book-id component
  // updateBook(book: Book, id: any): Observable<Book> {
  //   return this.http.put<Book>(
  //     `${this.apiUrl}/${id}`.replace('books', 'book'),
  //     book
  //   );
  // }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(
      `${this.apiUrl}/${id}`.replace('books', 'book'),
      book
    );
  }

  pagination(count: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}`, {
      params: new HttpParams().set('page', `${count}`),
    });
  }
}
