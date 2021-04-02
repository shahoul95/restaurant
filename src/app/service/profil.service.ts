import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  createaccount: any = FormGroup;



  constructor(private fb: FormBuilder) {

  }

  createEditAccount() {
    this.createaccount = this.fb.group({
      nom: [{ value: '', disabled: true }, Validators.required],
      prenom: [{ value: '', disabled: true }, Validators.required],
      adresse: [{ value: '', disabled: true }, Validators.required],
      ville: [{ value: '', disabled: true }, Validators.required],
      postale: [{ value: '', disabled: true }, Validators.required],
      mail: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      telephone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password: ['', Validators.required],

    });

    return this.createaccount;
  }



}
