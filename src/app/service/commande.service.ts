import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  subjectprice = new Subject<number>();
  price: any;
  newarray: any;
  duplicate: any;
  result: any;
  panier: any = new Array();
  user: any;
  items: Array<any> = [];
  item: any = []
  storage: any;
  appareilsSubject = new Subject<any[]>();
  paniers = new Subject<boolean>();
  verification: boolean;
  parselocal: any;
  constructor() {
    this.price = 0;
    this.verification = false;
  }

  getItems() {

    this.storage = localStorage.getItem('data');
    this.parselocal = localStorage.getItem('data');
    this.items = JSON.parse(this.parselocal);
    console.log(this.items);
    this.price = 0;
    this.items.forEach(product => {
      if (product.quantite) {
        this.price += (product.quantite * parseFloat(product.prix))
      } else {
        this.price += (parseFloat(product.prix))
      }
      console.log(this.items)
      console.log(this.price)

    });
    this.appareilsSubject.next(JSON.parse(this.storage))
    this.paniers.next(this.verification);
    this.subjectprice.next(this.price);
  }

  Addproduct(product: any) {

    if (localStorage.getItem('data')) {
      this.parselocal = localStorage.getItem('data');
      this.items = JSON.parse(this.parselocal);
      this.items.push(product);
      const seen = new Set();
      const filteredArr = this.items.filter(el => {
        this.duplicate = seen.has(el._id);

        seen.add(el._id);

        return !this.duplicate;
      });

      localStorage.setItem('data', JSON.stringify(filteredArr))
      this.verification = true
    } else {
      localStorage.setItem('data', "[]");
      this.items = JSON.parse(this.parselocal);
      this.items.push(product);
      localStorage.setItem('data', JSON.stringify(this.items));
      this.verification = true;

    }
    this.getItems();



  }

  deleteProduct(data: any) {
    this.parselocal = localStorage.getItem('data');
    this.items = JSON.parse(this.parselocal);
    console.log(this.items);
    this.items = this.items.filter(x => x._id !== data._id);
    console.log(this.items);
    localStorage.setItem('data', JSON.stringify(this.items));
    this.verification = true;
    this.getItems();

  }

  ChangeQte(quantite: any, id: any) {

    this.items.filter(product => product._id == id).map(element => {
      //met à jour la quantité du produit dans le panier
      element.quantite = parseInt(quantite)

    })
    localStorage.setItem('data', JSON.stringify(this.items))


    this.getItems();

  }

}









