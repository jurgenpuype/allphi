import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tankkaart } from '../models/tankkaart';

@Injectable({
  providedIn: 'root'
})

export class TankkaartService {

  constructor(  private http: HttpClient ) { }
  
  private tankkaartUrl = 'http://localhost:3000/tankkaart';  // URL to web api
  
  getTankkaarten(): Observable<Tankkaart[]> {
      return this.http.get<Tankkaart[]>(this.tankkaartUrl)
                    .pipe( catchError(this.handleError<Tankkaart[]>('getTankkaarten', [])) );
  }

  getTankkaart(id: number): Observable<Tankkaart> {
     const url = `${this.tankkaartUrl}/${id}`;
     return this.http.get<Tankkaart>(url).pipe(
       //tap(_ => this.log(`fetched hero id=${id}`)),
       catchError(this.handleError<Tankkaart>(`getTankkaart id=${id}`))
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
