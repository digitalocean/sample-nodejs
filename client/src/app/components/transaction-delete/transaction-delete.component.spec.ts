import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDeleteComponent } from './transaction-delete.component';

describe('TransactionDeleteComponent', () => {
  let component: TransactionDeleteComponent;
  let fixture: ComponentFixture<TransactionDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
