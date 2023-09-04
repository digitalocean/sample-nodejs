import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarUserComponent } from './side-bar-user.component';

describe('SideBarUserComponent', () => {
  let component: SideBarUserComponent;
  let fixture: ComponentFixture<SideBarUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
