import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormpaymentComponent } from './formpayment.component';

describe('FormpaymentComponent', () => {
  let component: FormpaymentComponent;
  let fixture: ComponentFixture<FormpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormpaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
