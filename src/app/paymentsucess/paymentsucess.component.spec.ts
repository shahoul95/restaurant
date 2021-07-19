import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsucessComponent } from './paymentsucess.component';

describe('PaymentsucessComponent', () => {
  let component: PaymentsucessComponent;
  let fixture: ComponentFixture<PaymentsucessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsucessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
