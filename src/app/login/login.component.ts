import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommandeService } from '../service/commande.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  display: boolean;
  googlesign: boolean;
  activelogin: string = 'active';
  activesign: string = '';
  success: boolean;
  notsuccess: boolean;
  loginsuccess: boolean;
  account: any;
  logout: any;
  panieritems: any;
  basketSubscription: Subscription = new Subscription();
  constructor(private fb: FormBuilder, public logs: LoginService, private router: Router, private commande: CommandeService) {
    this.display = true;
    this.googlesign = true;
    this.success = false;
    this.notsuccess = false;
    this.loginsuccess = false;
    this.account = false;
    this.logout = false;
    this.logs.createFormlogin();
    this.logs.createFormAccount();
  }

  async ngOnInit() {
    this.account = false || localStorage.getItem('user');
    this.logout = false || localStorage.getItem('user');
    this.basketSubscription = await this.commande.produitSubject.subscribe(
      (appareils: any[]) => {



        this.panieritems = appareils === null ? 0 : appareils.length;;
        console.log(this.panieritems);

      }
    );
    this.commande.getItems();

  }
  // Change des  liens
  ChangeLogin(): void {
    this.display = true;
    this.googlesign = true;
    this.activesign = '';
    this.activelogin = 'active';
  }

  ChangeSignup(): void {
    this.display = false;
    this.googlesign = false;
    this.activelogin = ' ';
    this.activesign = 'active'
  }

  // Connection avec le login
  async onSubmitlogin() {
    if (this.logs.login.valid) {
      let { mail, password } = this.logs.login.getRawValue();
      let tab = { mail, password };
      try {
        let loginsuccess = await this.logs.loginConnect(tab).then((result: any) => { return result }).catch(() => console.error('Failed!'));
        console.log(loginsuccess)
        if (loginsuccess == true) {
          this.loginsuccess = false;
          this.router.navigateByUrl('accueil')


        } else {
          this.loginsuccess = true;

        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('There is a problem with the form');
    }
  }

  // Cree un profile 
  async onSubmitcreate() {
    if (this.logs.createaccount.valid) {
      let { nom, prenom, adresse, telephone, mail, password, ville, postale } = this.logs.createaccount.getRawValue();
      let adresses = {
        adresse: adresse,
        ville: ville,
        postale

      }
      let tab = { nom, prenom, adresses, telephone, mail, password };

      try {
        let creatinglog = await this.logs.loginCreate(tab).then((res: any) => { return res }).catch(() => console.error('Failed!'));
        console.log(creatinglog);
        if (creatinglog) {
          this.success = true;
          this.notsuccess = false;
        }
        else if (creatinglog == false) {
          this.notsuccess = true;
          this.success = false;
        }
      } catch (error) {
        console.log(error);
      }

    } else {
      console.log('There is a problem with the form');
    }
  }



  onClickMe() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/accueil')
  }
}
