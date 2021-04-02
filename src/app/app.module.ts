import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component';
import { CommandeComponent } from './commande/commande.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material'
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './account/account.component';
import { ProfilComponent } from './profil/profil.component';

import { PanierComponent } from './panier/panier.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StripeModule } from "stripe-angular";
import { FormpaymentComponent } from './formpayment/formpayment.component';
import { PaymentsucessComponent } from './paymentsucess/paymentsucess.component';
import { ContactComponent } from './contact/contact.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    MenuComponent,
    CommandeComponent,
    FooterComponent,
    LoginComponent,
    AccountComponent,
    ProfilComponent,
    PanierComponent,
    FormpaymentComponent,
    PaymentsucessComponent,
    ContactComponent,

  ],
  imports: [

    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    StripeModule.forRoot("") 
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
