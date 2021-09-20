import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthsecurityService {

  constructor(private router: Router) { }

  canActivate() {
    const isNoSignedIn = localStorage.getItem("user");
    if (isNoSignedIn !== null) {
      this.router.navigateByUrl('/accueil')
      return false;
    }

    return true;

  }


}

@Injectable({
  providedIn: 'root'
})
export class AuthsecurityloginService {

  constructor(private router: Router) { }

  canActivate() {
    const isNoSignedIn = localStorage.getItem("user");
    if (isNoSignedIn == null) {
      this.router.navigateByUrl('/accueil')
      return false;
    }

    return true;

  }


}

@Injectable({
  providedIn: 'root'
})
export class Authsecuritypaymentservice {

  constructor(private router: Router) { }

  canActivate() {
    const isNoSignedIn = localStorage.getItem("tokenid");
    if (isNoSignedIn == null) {
      this.router.navigateByUrl('/accueil')
      return false;
    }

    return true;

  }


}

@Injectable({
  providedIn: 'root'
})
export class Authsecurityformpaymentservice {

  constructor(private router: Router) { }

  canActivate() {
    const isNoSignedIn = localStorage.getItem("data");
    const amount = localStorage.getItem('amount');
  
    if (isNoSignedIn == "[]") {
      this.router.navigateByUrl('/accueil')
      return false;
    }
    if (amount == null) {
      this.router.navigateByUrl('/accueil')
      return false;
    }
    return true;

  }


}
@Injectable({
  providedIn: 'root'
})
export class Authsecurityverifypassword {

  constructor(private router: Router) { }

  canActivate() {
 
  const telephone = localStorage.getItem('telephone');
  
    if(telephone == null){
      this.router.navigateByUrl('/forgotpassword')
    }
    return true;

  }


}
@Injectable({
  providedIn: 'root'
})
export class Authsecuritychangepassword {

  constructor(private router: Router) { }

  canActivate() {
  
  const telephoneid = localStorage.getItem('telephoneid');
  
    if(telephoneid == null){
      this.router.navigateByUrl('/forgotpassword')
    }
    return true;

  }


}