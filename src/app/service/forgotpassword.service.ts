import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import axios from 'axios';
import { error } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {
  number: any;
  verify: any = FormGroup;
  forgot: any = FormGroup;
  changepassword : any = FormGroup;
  result: any;
  constructor(private fb: FormBuilder,) { }

  createFormpassword() {
    this.forgot = this.fb.group({
      telephone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });
    return this.forgot;
  }

  createFormverify() {
    this.verify = this.fb.group({
      securite: ['', [Validators.required, Validators.pattern("^[0-9]{1,6}$")]]
    });
    return this.verify;
  }

createFormchangepassword(){
this.changepassword =  this.fb.group({
  newpassword:  ['', Validators.required],
  secondpassword: ['', Validators.required]
});
return this.changepassword;
}



  async SendNumber(number: any) {
    try {
      let numbers = {
        telephone: number
      }
      this.result = await axios.post('http://localhost:8080/sendnumber', numbers).then(status => { return status.status }).catch(error => { return error });
      if (this.result == 200) {
        return this.result;
      } else {
        return false;
      }
      return true;
    } catch (error) {
      if (error) {
        return false;
      }
    }


  }

  async SendToken(token: any) {
    try {
      this.number = localStorage.getItem('telephone');
      let number = {
        token: parseInt(token),
        telephone: parseInt(this.number)

      }
      console.log(number);
      this.result = await axios.post('http://localhost:8080/sendtoken', number).then(result => { return result }).catch(error => { return error });
      return this.result;

    } catch (error) {
      console.log(error);
    }
  }
  async Findusernumber(telephone: any) {
    try {
      console.log(telephone);
      this.result = await axios.post('http://localhost:8080/findusernumber', telephone).then(result => { return result }).catch(error => { return error });
      return this.result;

    } catch (error) {

    }
  }

  async Finduserchangepassword(password : any){
  
   try{
      if(localStorage.getItem('telephoneid')){
        let telephoneid = localStorage.getItem('telephoneid')
        this.result = await axios.patch(`https://backend-restaurants.herokuapp.com/finduserpasswordchange/${telephoneid}`,password).then(result=> {return result;}).catch(error=>{return error});
        return this.result;
      }
   }catch(error){
     return error;     
   }
  }
  
}
