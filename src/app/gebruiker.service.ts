import { Injectable } from '@angular/core';
import { Gebruiker } from './models/gebruiker';

@Injectable({
  providedIn: 'root'
})

export class GebruikerService {

  constructor() { }
  getGebruikers(): Gebruiker[] {
      return [];
  }
}
