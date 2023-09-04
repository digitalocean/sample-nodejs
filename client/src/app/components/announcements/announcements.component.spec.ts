import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementsComponent } from './announcements.component';

describe('AnnouncementsComponent', () => {
  let component: AnnouncementsComponent;
  let fixture: ComponentFixture<AnnouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
