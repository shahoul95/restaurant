import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../service/payment.service';

@Component({
  selector: 'app-paymentsucess',
  templateUrl: './paymentsucess.component.html',
  styleUrls: ['./paymentsucess.component.scss']
})
export class PaymentsucessComponent implements OnInit {

  constructor(private router: Router, private payment: PaymentService) {
    this.payment.CommandeAdd();
    this.payment.PanierAdd();

    this.payment.PaymentSuccess()

    this.payment.Sendmail();






  }

  ngOnInit(): void {





  }





}
