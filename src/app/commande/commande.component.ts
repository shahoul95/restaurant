import { Component, OnInit } from '@angular/core';
import { Liste } from '../service/liste';
import { ListeService } from '../service/liste.service';
import { Router } from '@angular/router';
import { MenuService } from '../service/menu.service';
import { CommandeService } from '../service/commande.service';

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {
  Listes: Liste[] = [];
  account: any;
  logout: any;
  menu: any;
  panieritems: any;
  basketSubscription: Subscription = new Subscription();
  constructor(private _Liste: ListeService, private _menufilter: MenuService, private router: Router, private commande: CommandeService) {
    this.Listes = this._Liste.GetAllListe();
    this.account = false;
    this.logout = false;

  }

  async ngOnInit() {

    this.account = false || localStorage.getItem('user');
    this.logout = false || localStorage.getItem('user');
    try {
      await this._menufilter.Menufilter("Entrées").then((res: any) => this.menu = res.data).catch(() => console.error('Failed!'));
      console.log(this.menu);
      this.basketSubscription = await this.commande.appareilsSubject.subscribe(
        (appareils: any[]) => {



          this.panieritems = appareils === null ? 0 : appareils.length;

          console.log(this.panieritems)
        }
      );
      this.commande.getItems();


    } catch (error) {
      console.log(error);
    }

  }
  onClickMe() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/accueil')
  }

  async onTabClick(filter: any) {

    try {
      await this._menufilter.Menufilter(filter).then((res: any) => this.menu = res.data).catch(() => console.error('Failed!'));
      console.log(this.menu);
    } catch (error) {
      console.log(error);
    }
  }

  Add(produits: any) {
    this.commande.Addproduct(produits);
    this.commande.getItems()
  }
}
