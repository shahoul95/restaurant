import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  response: any;
  constructor() { }

  async Menufilter(categories: any) {
    try {
      this.response = await axios.get('http://localhost:8080/getproduits/' + categories);
      return this.response;

    }
    catch (error) {
      console.error(error);
    }
  }
}
