import { Component, inject, OnInit } from '@angular/core';
import Author from '../../models/author.model';
import { AuthorService } from '../../services/author.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-author-id',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './author-id.component.html',
  styleUrl: './author-id.component.css',
})
export class AuthorIdComponent {
  constructor(
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  authors!: Author;

  fb = inject(FormBuilder);

  authorForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
  });

  private subscribeAuthor(id: number): void {
    this.authorService.getDetailAuthor(id).subscribe((data) => {
      this.authors = data;
    });
  }

  private setSubscribe(id: string | null) {
    if (id) {
      this.subscribeAuthor(+id);
    } else if (!id) {
      this.router.navigate(['authors']);
    }
  }

  // To update author from author-id component
  // updateAuthor() {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   this.authorService
  //     .updateAuthor(this.authorForm.value as Author, id)
  //     .subscribe();
  //   this.authorForm.reset();
  //   // console.log(this.authorForm.value);
  // }

  ngOnInit(Author: Author): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.setSubscribe(id);
  }
}
