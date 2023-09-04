import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRejectComponent } from './leave-reject.component';

describe('LeaveRejectComponent', () => {
  let component: LeaveRejectComponent;
  let fixture: ComponentFixture<LeaveRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveRejectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
