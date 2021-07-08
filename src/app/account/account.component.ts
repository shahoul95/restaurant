import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { ProfilService } from '../service/profil.service';
import { Subscription } from 'rxjs';
import { CommandeService } from '../service/commande.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  account: any;
  logout: any;
  userid: any;
  panieritems: any;
  basketSubscription: Subscription = new Subscription();

  constructor(private router: Router, private login: LoginService, private profil: ProfilService,  private commande: CommandeService) {
    this.account = false;
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
    this.login.ClearMessage()
    this.router.navigateByUrl('/accueil')

  }
 

}
