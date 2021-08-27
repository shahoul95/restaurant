import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  ids: any;
  id: any;
  commandeids: any;
  email: any
  resultpaiement: any;
  panierid: any;
  amount: any;
  paymentsubject = new Subject<any>();
  paysubject = new Subject<any>();
  formpayment: any = FormGroup;
  client: any
  user: any;
  result: any;
  orderid: any;
  productitems: any;
  results: any;
  subscription: Subscription = new Subscription();
  constructor(private fb: FormBuilder, private router: Router) {
    this.createFormpayment();

  }


  loadStripe() {

    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }
  }



  pay(amount: any) {
    let { nom, prenom, telephone, adresse, ville, postale } = this.formpayment.getRawValue();
    let clientpayment = { nom, prenom, telephone, adresse, ville, postale }
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51HvkmdHP35dfkCD3dLS1VFby68OPJAld3eO5BR0WXBwWBvfnyzguMj092x2ZKTgTdvi6B8rwDkPfOihnaFARsqpc00URykdBl0',
      locale: 'local',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        console.log(amount)
        if (token) {

          localStorage.setItem('client', JSON.stringify(clientpayment));
          localStorage.setItem('tokenid', token.id)
          location.href = '/successpayment'
        }

      }
    });
    if (localStorage.getItem('user')) {
      handler.open({
        name: 'Sapori Di Casa',
        description: 'Payment',
        amount: amount * 100,
        currency: "eur"
      });
    } else {
      this.router.navigateByUrl('login')
    }


  }
  createFormpayment() {
    this.formpayment = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      postale: ['', Validators.required]
    });
    return this.formpayment;
  }

  async CommandeAdd() {
    this.client = localStorage.getItem('client')
    this.user = localStorage.getItem('user')
    let commande = {
      client: JSON.parse(this.client),
      user: JSON.parse(this.user)
    }
    console.log();
    try {
      this.result = await axios.post('https://backend-restaurants.herokuapp.com/createorder', commande);
      if (this.result.data._id) {
        this.paymentsubject.next(this.result.data._id)
      }

    } catch (error) {
      console.log(error);
    }


  }

  PanierAdd() {

    this.productitems = localStorage.getItem('data')
    this.id = localStorage.getItem('user')
    this.ids = JSON.parse(this.id);
    try {
      this.paymentsubject.subscribe(async x => {
        let panier = {
          commande: x,
          produit: JSON.parse(this.productitems),
          clientid: this.ids.id
        }
        this.results = await axios.post('https://backend-restaurants.herokuapp.com/createorderproduct', panier).then(res => { }).catch(x => { 'failed' })


      });

    } catch (error) {
      console.log(error);
    }
  }

  PaymentSuccess() {
    try {

      this.subscription = this.paymentsubject.subscribe(async x => {
        console.log(x);
        this.amount = localStorage.getItem('amount')
        let idtoken = localStorage.getItem('tokenid');
        let paiement = {
          montantotal: parseFloat(this.amount),
          commandeid: x,
          token: idtoken

        }
        setTimeout(async () => {
          this.resultpaiement = await axios.post('https://backend-restaurants.herokuapp.com/paiement', paiement).then(x => { console.log(x) }).catch(x => { 'failed' })
        }, 5000);


      });

    } catch (error) {
      console.log(error);
    }
  }


  Sendmail() {
    try {
      this.subscription = this.paymentsubject.subscribe(async x => {
        if (x) {
          this.commandeids = x;
          this.amount = localStorage.getItem('amount')
          let product = {
            id: x,
            amount: this.amount
          }
          setTimeout(async () => {
            this.email = await axios.post('https://backend-restaurants.herokuapp.com/getorderpaiement', product).then(x => {
              if (x.data == 1) {
                localStorage.removeItem('amount');
                localStorage.removeItem('tokenid')

                localStorage.removeItem('data');
                localStorage.setItem('data', "[]");
                setTimeout(() => {
                  this.router.navigateByUrl('accueil');
                }, 200);

              }
            })
          }, 2000);

        }
      })

    } catch (error) {
      console.log(error);
    }
  }


}
