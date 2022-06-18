import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VoertuigType } from '../models/voertuigType';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class VoertuigTypeService {

  constructor(  private http: HttpClient ) { }
  
  private voertuigTypeUrl = 'https://sheer-circular-duchess.glitch.me/voertuigType';  // URL to web api
  
  getVoertuigTypes(): Observable<VoertuigType[]> {
      return this.http.get<VoertuigType[]>(this.voertuigTypeUrl)
                    .pipe( catchError(this.handleError<VoertuigType[]>('getVoertuigTypes', [])) );
  }

  getVoertuigType(id: number): Observable<VoertuigType> {
     const url = `${this.voertuigTypeUrl}/${id}`;
     return this.http.get<VoertuigType>(url).pipe(
       //tap(_ => this.log(`fetched hero id=${id}`)),
       catchError(this.handleError<VoertuigType>(`getVoertuigType id=${id}`))
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
