import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnnouncementComponent } from './announcement-create.component';

describe('CreateAnnouncementComponent', () => {
  let component: CreateAnnouncementComponent;
  let fixture: ComponentFixture<CreateAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAnnouncementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
