import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCloseComponent } from './article-close.component';

describe('ArticleCloseComponent', () => {
  let component: ArticleCloseComponent;
  let fixture: ComponentFixture<ArticleCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleCloseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
