import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bestuurder } from '../models/bestuurder';

@Injectable({
  providedIn: 'root'
})

export class BestuurderService {

  constructor(  private http: HttpClient ) { }
  
  private bestuurderUrl = 'http://localhost:3000/bestuurder';  // URL to web api
  
  getBestuurders(): Observable<Bestuurder[]> {
      return this.http.get<Bestuurder[]>(this.bestuurderUrl)
                    .pipe( catchError(this.handleError<Bestuurder[]>('getBestuurders', [])) );
  }

  getBestuurder(id: number): Observable<Bestuurder> {
     const url = `${this.bestuurderUrl}/${id}`;
     return this.http.get<Bestuurder>(url).pipe(
       //tap(_ => this.log(`fetched hero id=${id}`)),
       catchError(this.handleError<Bestuurder>(`getBestuurder id=${id}`))
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
