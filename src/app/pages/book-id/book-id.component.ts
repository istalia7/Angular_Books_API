import { Component, inject } from '@angular/core';
import { BookService } from '../../services/book.service';
import Book from '../../models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-book-id',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './book-id.component.html',
  styleUrl: './book-id.component.css',
})
export class BookIdComponent {
  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  fb = inject(FormBuilder);

  bookForm = this.fb.group({
    title: ['', [Validators.required]],
    coverText: ['', [Validators.required]],
    comment: ['', [Validators.required]],
    idAuthor: 0,
  });

  books!: Book;

  private subscribeBook(id: number): void {
    this.bookService.getDetailBook(id).subscribe((data) => {
      this.books = data;
      // console.log(this.books);
    });
  }

  private setSubscribe(id: string | null) {
    if (id) {
      this.subscribeBook(+id);
    } else if (!id) {
      this.router.navigate(['books']);
    }
  }

  // to update book from book-id component
  // updateBook() {
  //   if (this.bookForm.valid) {
  //     const id = this.route.snapshot.paramMap.get('id');
  //     this.bookService.updateBook(this.bookForm.value as Book, id).subscribe();
  //     alert('Le livre a bien été modifié');
  //     this.bookForm.reset();
  //   }
  // }

  ngOnInit(Book: Book): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.setSubscribe(id);
  }
}
