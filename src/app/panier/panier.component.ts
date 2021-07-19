import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommandeService } from '../service/commande.service';
import { PaymentService } from '../service/payment.service';
@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  quantites: any;
  totals: any = []
  paniers: boolean;
  account: any;
  logout: any;
  commandes: any;
  panier: Array<any> = [];
  parsing: any;
  parselocal: any
  panieritems: any;
  basketSubscription: Subscription = new Subscription();
  verif: Subscription = new Subscription();
  prices: Subscription = new Subscription();
  constructor(private router: Router, private commande: CommandeService, private payments: PaymentService) {
    this.account = false;
    this.logout = false;
    this.paniers = false;
    this.totals = 0;
  }

  async ngOnInit() {
    /*   this.payments.loadStripe() */
    this.account = false || localStorage.getItem('user');
    this.logout = false || localStorage.getItem('user');

    this.basketSubscription = await this.commande.produitSubject.subscribe(
      (appareils: any[]) => {
        console.log(this.panier)

        this.panier = appareils;

        this.panieritems = appareils === null ? 0 : appareils.length;
        console.log(this.panier)
        // this.totals = this.panier.map(a  => parseFloat(a.prix.replace(/,/gi, ".").substring(0,1))).reduce(function(a, b)
        // {
        //   return a + b;
        // });


        if (this.panier.length > 0) {
          this.paniers = true;
        }
      }
    );
    this.commande.getItems()
    this.prices = await this.commande.subjectprice.subscribe(x => this.totals = x);



    this.commande.getItems()

  }
  onClickMe() {
    localStorage.removeItem('user');
    this.account = false || localStorage.getItem('user');
    this.logout = false || localStorage.getItem('user');

  }

  Remove(remove: any) {
    console.log(this.panier)


    this.commande.deleteProduct(remove);
    console.log(this.panier);
    if (this.panier.length == 0) {
      this.paniers = false;
    }
    this.commande.getItems()
  }
  ChangeQte(quantites: any, id: any) {


    this.commande.ChangeQtes(quantites.target.value, id)

  }
  checkout(amount: any) {
    localStorage.setItem('amount', amount);
    this.router.navigateByUrl('formpayment')

  }
}
