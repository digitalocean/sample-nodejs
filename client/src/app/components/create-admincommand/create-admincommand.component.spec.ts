import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdminCommandComponent } from './create-admincommand.component';

describe('CreateAdminCommandComponent', () => {
  let component: CreateAdminCommandComponent;
  let fixture: ComponentFixture<CreateAdminCommandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAdminCommandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdminCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
