import { Routes } from '@angular/router';
import { BookComponent } from './pages/book/book.component';
import { BookIdComponent } from './pages/book-id/book-id.component';
import { AuthorComponent } from './pages/author/author.component';
import { AuthorIdComponent } from './pages/author-id/author-id.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: 'home', redirectTo: 'home', pathMatch: 'full' },
  { path: 'books', component: BookComponent },
  { path: 'books/:id', component: BookIdComponent },
  { path: 'authors', component: AuthorComponent },
  { path: 'authors/:id', component: AuthorIdComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
];
