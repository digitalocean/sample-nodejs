import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesUserComponent } from './leaves-user.component'

describe('LeavesUserComponent', () => {
  let component: LeavesUserComponent;
  let fixture: ComponentFixture<LeavesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavesUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
