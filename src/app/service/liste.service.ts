import { Injectable } from '@angular/core';
import { Liste } from './liste';
@Injectable({
  providedIn: 'root'
})
export class ListeService {

  constructor() { }
  public getAll(): Liste[] {
    const array: Liste[] = [];
    array.push(new Liste('Entrées'));
    array.push(new Liste('Pâtes'));
    array.push(new Liste('Ravioli Gnocchi'));
    array.push(new Liste('Pizza'));
    array.push(new Liste('Salades'));
    array.push(new Liste('Desserts'));
    array.push(new Liste('Vin et Bière'));
    array.push(new Liste('Boissons'));

    return array;
  }
  public GetAllListe(): Liste[] {
    const array: Liste[] = [];
    array.push(new Liste('Entrées'));
    array.push(new Liste('Pâtes'));
    array.push(new Liste('Ravioli Gnocchi'));
    array.push(new Liste('Pizza'));
    array.push(new Liste('Salades'));
    array.push(new Liste('Desserts'));
    array.push(new Liste('Vin et Bière'));
    array.push(new Liste('Boissons'));
    return array;
  }

}
