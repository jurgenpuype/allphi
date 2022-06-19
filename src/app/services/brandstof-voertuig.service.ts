import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BrandstofVoertuig } from '../models/brandstofVoertuig';

@Injectable({
  providedIn: 'root'
})
export class BrandstofVoertuigService {

  constructor(  private http: HttpClient ) { }
  
  private brandstofVoertuigUrl = 'http://galileiit-001-site1.htempurl.com/brandstofvoertuig';  // URL to web api
  
  getBrandstoffenVoertuig(): Observable<BrandstofVoertuig[]> {
      return this.http.get<BrandstofVoertuig[]>(this.brandstofVoertuigUrl)
                    .pipe( catchError(this.handleError<BrandstofVoertuig[]>('getBrandstoffenVoertuig', [])) );
  }

  getBrandstofVoertuig(id: number): Observable<BrandstofVoertuig> {
     const url = `${this.brandstofVoertuigUrl}/${id}`;
     return this.http.get<BrandstofVoertuig>(url).pipe(
       //tap(_ => this.log(`fetched hero id=${id}`)),
       catchError(this.handleError<BrandstofVoertuig>(`getBrandstofVoertuig id=${id}`))
     );
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
