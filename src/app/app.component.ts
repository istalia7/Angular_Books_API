import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { BookComponent } from './pages/book/book.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BookComponent, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  title = 'AngularBooks';
  router = inject(Router);

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  isAuthenticated(): boolean {
    if (this.authService.IsLoggedIn()) {
      return true;
    }
    return false;
  }
}
