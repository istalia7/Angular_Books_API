import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Author from '../models/author.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private apiUrl = 'https://127.0.0.1:8000/api/authors';

  constructor(private http: HttpClient) {}

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.apiUrl}`);
  }

  getDetailAuthor(id: number): Observable<Author> {
    return this.http.get<Author>(
      `${this.apiUrl}/${id}`.replace('authors', 'author')
    );
  }

  deleteAuthor(id: number): Observable<Author> {
    return this.http.delete<Author>(
      `${this.apiUrl}/${id}`.replace('authors', 'author')
    );
  }

  createAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(`${this.apiUrl}`, author);
  }

  // updateAuthor(author: Author, id: any): Observable<Author> {
  //   return this.http.put<Author>(
  //     `${this.apiUrl}/${id}`.replace('authors', 'author'),
  //     author
  //   );
  // }

  updateAuthor(author: Author, id: number): Observable<Author> {
    return this.http.put<Author>(
      `${this.apiUrl}/${id}`.replace('authors', 'author'),
      author
    );
  }

  pagination(count: number): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.apiUrl}`, {
      params: new HttpParams().set('page', `${count}`),
    });
  }
}
