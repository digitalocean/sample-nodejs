import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAdminDashboardComponent } from './non-admin-dashboard.component';

describe('NonAdminDashboardComponent', () => {
  let component: NonAdminDashboardComponent;
  let fixture: ComponentFixture<NonAdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonAdminDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
