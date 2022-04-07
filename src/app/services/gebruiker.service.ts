import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gebruiker } from '../models/gebruiker';

@Injectable({
  providedIn: 'root'
})

export class GebruikerService {

  constructor(  private http: HttpClient ) { }
  
  private gebruikerUrl = 'http://localhost:3000/gebruiker';  // URL to web api
  
  getGebruikers(): Observable<Gebruiker[]> {
      return this.http.get<Gebruiker[]>(this.gebruikerUrl)
                    .pipe( catchError(this.handleError<Gebruiker[]>('getGebruikers', [])) );
  }

  getGebruiker(id: number): Observable<Gebruiker> {
     const url = `${this.gebruikerUrl}/${id}`;
     return this.http.get<Gebruiker>(url).pipe(
       //tap(_ => this.log(`fetched hero id=${id}`)),
       catchError(this.handleError<Gebruiker>(`getGebruiker id=${id}`))
     );
  }
 
  async checkLogin(login: string, pwd: string): Promise<any> {
     const url = `${this.gebruikerUrl}?gebLogin=${login}&gebPassword=${pwd}`;
     return await this.http.get<Gebruiker[]>(url).toPromise();
  }
 
  private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        //this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
  }
}
