import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rijbewijs } from '../models/rijbewijs';
import { RijbewijsType } from '../models/rijbewijsType';
import { RijbewijstypeRijbewijs } from '../models/rijbewijstypeRijbewijs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class RijbewijsService {

  constructor(  private http: HttpClient ) { }
  
  private rijbewijsUrl = 'http://localhost:3000/rijbewijs';  // URL to web api
  private rijbewijsTypeUrl = 'http://localhost:3000/rijbewijsType';  // URL to web api
  private rijbewijstypeRijbewijsUrl = 'http://localhost:3000/rijbewijstypeRijbewijs';  // URL to web api
  
  createRijbewijs(rijbewijs: Rijbewijs) : Observable<Rijbewijs> {
     return this.http.post<Rijbewijs>(this.rijbewijsUrl, rijbewijs, httpOptions)
       .pipe( catchError(this.handleError<Rijbewijs>(`CreateRijbewijs`)));
  }

  getRijbewijstypeRijbewijzen(): Observable<RijbewijstypeRijbewijs[]> {
      return this.http.get<RijbewijstypeRijbewijs[]>(this.rijbewijstypeRijbewijsUrl)
                    .pipe( catchError(this.handleError<RijbewijstypeRijbewijs[]>('getRijbewijstypeRijbewijzen', [])) );
  }

  async  getRijbewijstypeRijbewijs(id: number): Promise<any> {
     const url = `${this.rijbewijstypeRijbewijsUrl}/${id}`;
     return await this.http.get<RijbewijstypeRijbewijs[]>(url).toPromise();
  }
  
  getRijbewijsTypes(): Observable<RijbewijsType[]> {
      return this.http.get<RijbewijsType[]>(this.rijbewijsTypeUrl)
                    .pipe( catchError(this.handleError<RijbewijsType[]>('getRijbewijsTypes', [])) );
  }

  getRijbewijsCategorieen(rijId : number): Observable<RijbewijsType[]> {
      const baseUrl = this.rijbewijstypeRijbewijsUrl + '/?rtrRijbewijsId=';
      const url = `${baseUrl}${rijId}`;
      return this.http.get<RijbewijsType[]>(url)
                    .pipe( catchError(this.handleError<RijbewijsType[]>('getRijbewijsTypes', [])) );
  }
  getRijbewijsType(id: number): Observable<RijbewijsType> {
     const url = `${this.rijbewijsTypeUrl}/${id}`;
     return this.http.get<RijbewijsType>(url).pipe(
       //tap(_ => this.log(`fetched hero id=${id}`)),
       catchError(this.handleError<RijbewijsType>(`getRijbewijsType id=${id}`))
     );
  }

  getRijbewijzen(): Observable<Rijbewijs[]> {
      return this.http.get<Rijbewijs[]>(this.rijbewijsUrl)
                    .pipe( catchError(this.handleError<Rijbewijs[]>('getRijbewijzen', [])) );
  }

  getRijbewijs(id: number): Observable<Rijbewijs> {
     const url = `${this.rijbewijsUrl}/${id}`;
     return this.http.get<Rijbewijs>(url).pipe(
       //tap(_ => this.log(`fetched hero id=${id}`)),
       catchError(this.handleError<Rijbewijs>(`getRijbewijs id=${id}`))
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
