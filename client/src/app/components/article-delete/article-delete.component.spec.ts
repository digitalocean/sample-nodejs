import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDeleteComponent } from './article-delete.component';

describe('ArticleDeleteComponent', () => {
  let component: ArticleDeleteComponent;
  let fixture: ComponentFixture<ArticleDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
