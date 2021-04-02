import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../service/commande.service';
import { PaymentService } from '../service/payment.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-formpayment',
  templateUrl: './formpayment.component.html',
  styleUrls: ['./formpayment.component.scss']
})
export class FormpaymentComponent implements OnInit {
  panieritems: any;
  logout: any;
  account: any;
  basketSubscription: Subscription = new Subscription();
  amount: any;
  constructor(private commande: CommandeService, public formspayment: PaymentService, private payment: PaymentService) {
    this.account = false;
    this.logout = false;
    this.formspayment.createFormpayment();
    this.amount = localStorage.getItem('amount')
  }

  async ngOnInit() {
    this.amount = localStorage.getItem('amount')
    this.payment.loadStripe()
    this.account = false || localStorage.getItem('user');
    this.logout = false || localStorage.getItem('user');

    this.basketSubscription = await this.commande.appareilsSubject.subscribe(
      (appareils: any[]) => {



        this.panieritems = appareils === null ? 0 : appareils.length;;

      }
    );
    this.commande.getItems();



  }
  onClickMe() {
    localStorage.removeItem('user');
    this.account = false || localStorage.getItem('user');
    this.logout = false || localStorage.getItem('user');




  }
  onSubmitPayment() {
    this.formspayment.pay(this.amount);
  }
} 
