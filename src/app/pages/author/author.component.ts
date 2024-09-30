import { Component, inject, OnInit } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import Author from '../../models/author.model';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css',
})
export class AuthorComponent implements OnInit {
  constructor(private authorService: AuthorService) {}

  fb = inject(FormBuilder);

  authorForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
  });

  authorFormUpdate = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  authService = inject(AuthService);

  isAdmin = this.authService.getRoles('ROLE_ADMIN');

  currentPage: number = 1;

  authors!: Author[];

  authorDelete!: Author;

  deleteAuthor(value: Author) {
    this.authorService.deleteAuthor(value.id).subscribe((data) => {
      this.authorDelete = data;
    });
    return (
      alert("L'auteur a été supprimé"),
      this.authorService.getAuthors().subscribe((data) => {
        this.authors = data;
      })
    );
  }

  addAuthor() {
    this.authorService
      .createAuthor(this.authorForm.value as Author)
      .subscribe();
    // console.log(this.authorForm.value);
    this.authorForm.reset();
  }

  updateAuthor(value: Author) {
    this.authorService
      .updateAuthor(this.authorFormUpdate.value as Author, value.id)
      .subscribe();
    // console.log(this.authorForm.value);
    this.authorFormUpdate.reset();
  }

  ngOnInit(): void {
    // this.authorService.getAuthors().subscribe((data) => {
    //   this.authors = data;
    // });
    this.loadAuthors();
  }

  loadAuthors() {
    this.authorService.pagination(this.currentPage).subscribe((data) => {
      this.authors = data;
    });
  }

  nextPage() {
    this.currentPage++;
    this.loadAuthors();
  }

  previousPage() {
    this.currentPage--;
    this.loadAuthors();
  }
}
