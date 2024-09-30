import { Component, inject, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import Book from '../../models/book.model';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthorService } from '../../services/author.service';
import Author from '../../models/author.model';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponseBase,
} from '@angular/common/http';
import { count } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnInit {
  constructor(private bookService: BookService, private http: HttpClient) {}

  fb = inject(FormBuilder);
  errorMessage: string = '';
  userList: any[] = [];
  currentPage: number = 1;

  bookForm = this.fb.group({
    title: ['', [Validators.required]],
    coverText: ['', [Validators.required]],
    comment: ['', [Validators.required]],
    idAuthor: 0,
  });

  bookFormUpdate = this.fb.group({
    title: ['', [Validators.required]],
    coverText: ['', [Validators.required]],
    comment: ['', [Validators.required]],
    idAuthor: 0,
  });

  submitted: boolean = false;

  authService = inject(AuthService);

  isAdmin = this.authService.getRoles('ROLE_ADMIN');

  books!: Book[];

  authors!: Author[];

  bookDelete!: Book;

  deleteBook(value: Book) {
    this.bookService.deleteBook(value.id).subscribe(
      (data) => {
        // this.bookDelete = data;
        // return (
        //   alert('Le livre a été supprimé'),
        //   this.bookService.getBooks().subscribe((data) => {
        //     this.books = data;
        //   })
        // );
        this.bookDelete = data;
        alert('Le livre a été supprimé');
        this.bookService.getBooks().subscribe((data) => {
          this.books = data;
        });
      },
      (error) => {
        this.errorMessage = error.error.message;
        alert(this.errorMessage);
      }
    );
  }

  addBook() {
    this.bookService.createBook(this.bookForm.value as Book).subscribe({
      next: (response) => {
        alert('Le livre a été ajouté avec succès !');
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        alert(this.errorMessage);
      },
    });
    this.bookForm.reset();
    // console.log(this.bookForm.value);
  }

  updateBook(value: Book) {
    this.bookService
      .updateBook(value.id, this.bookFormUpdate.value as Book)
      .subscribe({
        next: (response) => {
          alert('Le livre a bien été modifié !');
        },
        error: (error) => {
          this.errorMessage = error.error.message;
          alert(this.errorMessage);
        },
      });
    this.bookFormUpdate.reset();
  }

  ngOnInit(): void {
    this.loadBooks();
    // console.log(this.isAdmin);
    // this.bookService.getBooks().subscribe((data) => {
    //   this.books = data;
    //   // console.log(data);
    // });

    this.bookService.getAuthors().subscribe((data) => {
      this.authors = data;
    });
  }

  loadBooks() {
    this.bookService.pagination(this.currentPage).subscribe((data) => {
      this.books = data;
      // console.log(Res.data);
      // this.userList = Res.data;
    });
  }

  nextPage() {
    this.currentPage++;
    this.loadBooks();
  }

  previousPage() {
    this.currentPage--;
    this.loadBooks();
  }
}
