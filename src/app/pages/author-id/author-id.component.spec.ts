import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorIdComponent } from './author-id.component';

describe('AuthorIdComponent', () => {
  let component: AuthorIdComponent;
  let fixture: ComponentFixture<AuthorIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthorIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
