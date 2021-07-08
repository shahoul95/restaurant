import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeService } from '../service/commande.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  nombre: any;
  account: any;
  logout: any;
  panieritems: any;
  basketSubscription: Subscription = new Subscription();
  constructor(private router: Router, private commande: CommandeService) {
    this.account = false;
    this.nombre = 20;
    this.logout = false;
  }

  async ngOnInit() {

    this.account = false || localStorage.getItem('user');
    this.logout = false || localStorage.getItem('user');

    this.basketSubscription = await this.commande.produitSubject.subscribe(
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
}
