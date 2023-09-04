import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizePasswordComponent } from './authorize-password.component';

describe('AuthorizePasswordComponent', () => {
  let component: AuthorizePasswordComponent;
  let fixture: ComponentFixture<AuthorizePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
