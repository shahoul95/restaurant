import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  update: any;
  login: any = FormGroup;
  profilsubject = new Subject<any[]>();
  createaccount: any = FormGroup;
  logincreate: any;
  loginconnect: any;
  userfinbyid: any;
  users: any;
  id: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.createFormAccount();
    this.createFormlogin();

    this.users = localStorage.getItem('user');
    this.id = JSON.parse(this.users)

  }

  createFormlogin() {
    this.login = this.fb.group({
      mail: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required]
    });
    return this.login;
  }

  createFormAccount() {
    this.createaccount = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      postale: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      telephone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password: ['', Validators.required],
     
    });
    return this.createaccount;
  }
  async loginCreate(user: any) {

    try {
      this.logincreate = await axios.post('https://backend-restaurants.herokuapp.com/createuser', { nom: user.nom, prenom: user.prenom, adresse: user.adresses, telephone: user.telephone, mail: user.mail, password: user.password });
      if (this.logincreate.status == 201) {
        this.createaccount.reset()
        return true;
      }
      return true;
    }
    catch (error) {
      return false;
    }

  }

  async loginConnect(user: any) {

    try {

      this.loginconnect = await axios.post('https://backend-restaurants.herokuapp.com/login', user);
      if (this.loginconnect.status == 200) {


        let user = {

          user: this.loginconnect.data.user,//true
          token: this.loginconnect.data.token,// token
          id: this.loginconnect.data.id
        }
        localStorage.setItem("user", JSON.stringify(user))

        return true
      }
      return true;
    } catch (error) {
      return false;
    }


  }

  async userFindId() {
    try {
      this.users = localStorage.getItem('user');
      this.id = JSON.parse(this.users)
      if (this.id.id && this.id.token) {
        this.userfinbyid = await axios.get(`https://backend-restaurants.herokuapp.com/profile/${this.id.id}`, { headers: { 'Authorization': `Bearer ${this.id.token}` } })
        this.profilsubject.next(this.userfinbyid);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async UpdateProfile(information: any) {
    try {
      this.users = localStorage.getItem('user');
      this.id = JSON.parse(this.users)
      if (this.id.id) {
        this.update = await axios.patch(`https://backend-restaurants.herokuapp.com/profileupdate/${this.id.id}`, information).then(x => {
          return x;
        }).catch(x => { return false });

        return this.update.data.success;
      }

      return this.update.success;
    } catch (error) {

      return false;
    }
  }
  GetMessage() {
    return this.profilsubject.asObservable();

  }

  ClearMessage() {
    this.profilsubject.next();
  }
}
