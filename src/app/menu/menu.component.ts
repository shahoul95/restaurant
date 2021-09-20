import { Component, OnInit } from '@angular/core';
import { Liste } from '../service/liste';
import { ListeService } from '../service/liste.service';
import { MenuService } from '../service/menu.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommandeService } from '../service/commande.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  Listes: Liste[] = [];
  menu: any;
  listes: any;
  account: any;
  logout: any;
  panieritems: any;
  basketSubscription: Subscription = new Subscription();
  constructor(private _liste: ListeService, private _menufilter: MenuService, private router: Router, private commande: CommandeService) {
    this.Listes = this._liste.getAll();
    this.account = false;
    this.logout = false;
  }

  async ngOnInit() {
    this.account = false || localStorage.getItem('user');
    this.logout = false || localStorage.getItem('user');
    try {
      await this._menufilter.Menufilter("Entrées").then((res: any) => this.menu = res.data).catch(() => console.error('Failed!'));
      this.basketSubscription = await this.commande.produitSubject.subscribe(
        (appareils: any[]) => {



          this.panieritems = appareils === null ? 0 : appareils.length;
         
        }
      );
      this.commande.getItems();
    } catch (error) {
      console.log(error);
    }
  }

  async onTabClick(event: any) {

    try {
      await this._menufilter.Menufilter(event.tab.textLabel).then((res: any) => this.menu = res.data).catch(() => console.error('Failed!'));
    

    } catch (error) {
      console.log(error);
    }
  }
  onClickMe() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/accueil')
  }

}
