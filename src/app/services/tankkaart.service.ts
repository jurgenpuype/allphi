import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tankkaart } from '../models/tankkaart';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class TankkaartService {

  constructor(  private http: HttpClient ) { }
  
  private tankkaartUrl = 'https://sheer-circular-duchess.glitch.me/tankkaart';  // URL to web api
  
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
 
   updateTankkaart(tankkaart: Tankkaart): Observable<Tankkaart> {
     const id = tankkaart.id;
     const url = `${this.tankkaartUrl}/${id}`;
     return this.http.put<Tankkaart>(url, tankkaart, httpOptions)
       .pipe(
        catchError(this.handleError<Tankkaart>(`updateTankkaart id=${id}`))
       );
  }

   createTankkaart(tankkaart: Tankkaart): Observable<Tankkaart> {
     return this.http.post<Tankkaart>(this.tankkaartUrl, tankkaart, httpOptions)
       .pipe(
        catchError(this.handleError<Tankkaart>(`Create Tankkaart`))
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
