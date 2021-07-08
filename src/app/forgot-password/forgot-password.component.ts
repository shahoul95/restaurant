import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../service/commande.service';
import { Subscription } from 'rxjs';
import { ForgotpasswordService } from '../service/forgotpassword.service';
import { Router } from '@angular/router';
import { error } from 'protractor';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
   numero : boolean;
  account: any;
  logout: any;
  panieritems: any;
  result: any;
  basketSubscription: Subscription = new Subscription();
  constructor(private commande: CommandeService, public password: ForgotpasswordService,private router : Router) {
    this.password.createFormpassword()
    this.logout = false;
    this.account = false;
    this.numero = false;
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

  async onSubmitForgot() {

    let { telephone } = this.password.forgot.getRawValue();
    let telephones = parseInt(telephone);
    let data = {
      telephone: telephones
    }
    try {
      this.result = await this.password.Findusernumber(data).then(x=> {return x}).catch(error=>{return error});
    
      if(this.result){
        
        localStorage.setItem('telephone',this.result.data.telephones.telephone)
        localStorage.setItem('telephoneid',this.result.data.telephones._id)
         this.numero = false;
          this.password.SendNumber(this.result.data.telephones.telephone).then(result=> console.log(result)).catch(error => console.log(error))
          this.router.navigateByUrl('verifypassword');
     }

    } catch (error) {
      if(error){
        this.numero = true;
      }
    }
  }



}
