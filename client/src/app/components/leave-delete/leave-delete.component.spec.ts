import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveDeleteComponent } from './leave-delete.component';

describe('LeaveDeleteComponent', () => {
  let component: LeaveDeleteComponent;
  let fixture: ComponentFixture<LeaveDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
