import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Voertuig } from '../models/voertuig';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class VoertuigService {

  constructor(  private http: HttpClient ) { }
  
  private voertuigUrl = 'http://galileiit-001-site1.htempurl.com/voertuig';  // URL to web api
  
  getVoertuigen(): Observable<Voertuig[]> {
      return this.http.get<Voertuig[]>(this.voertuigUrl)
                    .pipe( catchError(this.handleError<Voertuig[]>('getVoertuigen', [])) );
  }

  getVoertuig(id: number): Observable<Voertuig> {
     const url = `${this.voertuigUrl}/${id}`;
     return this.http.get<Voertuig>(url).pipe(
       //tap(_ => this.log(`fetched hero id=${id}`)),
       catchError(this.handleError<Voertuig>(`getVoertuig id=${id}`))
     );
  }
 
   createVoertuig(voertuig: Voertuig): Observable<Voertuig> {
     return this.http.post<Voertuig>(this.voertuigUrl, voertuig, httpOptions)
       .pipe(
        catchError(this.handleError<Voertuig>(`createVoeretuig mislukt!!`))
       );
  }

   updateVoertuig(voertuig: Voertuig): Observable<Voertuig> {
     const id = voertuig.voeId;
     const url = `${this.voertuigUrl}/${id}`;
     return this.http.put<Voertuig>(url, voertuig, httpOptions)
       .pipe(
        catchError(this.handleError<Voertuig>(`updateVoeretuig id=${id}`))
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
