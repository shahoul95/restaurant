import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  createcontact: any = FormGroup;
  contact: any;
  constructor(private fb: FormBuilder) {
    this.createFormContact();
  }
  createFormContact() {
    this.createcontact = this.fb.group({
      from: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      subject: ['', Validators.required],
      text: ['', Validators.required]

    });
    return this.createcontact;
  }

  async SendContact(contact: any) {
    this.contact = await axios.post('https://backend-restaurants.herokuapp.com/sendmail', contact).then(body => {
      if (body) {
        return body;

      }
      else {
        return false;
      }
    }).catch(error => { return error; })
    return contact;

  }
}
