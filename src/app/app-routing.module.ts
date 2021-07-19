import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuComponent} from './menu/menu.component'
import { HomeComponent} from './home/home.component'
import { CommandeComponent} from './commande/commande.component'
import { LoginComponent} from './login/login.component'
import { AccountComponent} from './account/account.component'
import {AuthsecurityService } from './service/authsecurity.service'
import { AuthsecurityloginService} from './service/authsecurity.service'
import { PanierComponent } from './panier/panier.component';
 import {PaymentsucessComponent} from './paymentsucess/paymentsucess.component'
import {FormpaymentComponent } from './formpayment/formpayment.component'
import {ContactComponent} from './contact/contact.component'
import {Authsecuritypaymentservice} from './service/authsecurity.service';
import { Authsecurityformpaymentservice} from './service/authsecurity.service';
import {  ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import { VerifypasswordComponent} from './verifypassword/verifypassword.component';
import {Authsecurityverifypassword } from './service/authsecurity.service';
import {ChangepasswordComponent} from './changepassword/changepassword.component';
import {Authsecuritychangepassword} from './service/authsecurity.service';
const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' }, 
  { path: 'accueil', component: HomeComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'commande', component: CommandeComponent},
  { path: 'login', component: LoginComponent,canActivate: [AuthsecurityService]},
  { path: 'account', component: AccountComponent,canActivate: [AuthsecurityloginService] },
  { path: 'panier', component: PanierComponent  },
  { path: 'formpayment', component:FormpaymentComponent, canActivate:  [Authsecurityformpaymentservice]},
  { path: 'successpayment', component: PaymentsucessComponent,canActivate: [Authsecuritypaymentservice] },
  { path: 'contact', component:ContactComponent},
  {path: 'forgotpassword', component:  ForgotPasswordComponent},
  {path: 'verifypassword', component:VerifypasswordComponent,canActivate: [Authsecurityverifypassword ]},
  {path: 'changepassword', component:ChangepasswordComponent, canActivate:[Authsecuritychangepassword ] }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
