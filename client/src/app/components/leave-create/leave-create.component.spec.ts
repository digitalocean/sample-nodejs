import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeaveComponent } from './leave-create.component';

describe('CreateLeaveComponent', () => {
  let component: CreateLeaveComponent;
  let fixture: ComponentFixture<CreateLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
