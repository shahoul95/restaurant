import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { ProfilService } from '../service/profil.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  success: any;
  modification: boolean
  accountsubscription: Subscription = new Subscription;
  user: any;
  number: any;
  mail: any;
  telephone: any;
  password: any;
  modifications: any
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  constructor(public profil: ProfilService, public login: LoginService, private router: Router) {
    this.profil.createEditAccount();
    this.login.userFindId();
    this.modification = false;
    this.modifications = false;

  }

  async ngOnInit() {
    this.accountsubscription = await this.login.GetMessage().subscribe(message => { this.user = message });
    this.login.userFindId()
  }
  async onSubmitupdate() {
    let { telephone, mail, password } = this.profil.createaccount.getRawValue();
    let update = {
      telephone: telephone,
      mail: mail,
      password: password
    }
    try {
      this.success = await this.login.UpdateProfile(update).then(x => {
        return x;
      }).catch(x => { return x })
      if (this.success === true) {
        this.password = '';
        this.telephone = '';
        this.mail = '';
        this.modifications = false;
        this.modification = true;

      } else {
        this.modification = false;
        this.modifications = true;
      }
    } catch (error) {
      return error;
    }

  }

}
