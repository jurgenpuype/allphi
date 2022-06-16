import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bestuurder } from '../models/bestuurder';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class BestuurderService {

  constructor(  private http: HttpClient ) { }
  
  private bestuurderUrl = 'https://sheer-circular-duchess.glitch.me/bestuurder';  // URL to web api
 
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
 
  updateBestuurder(bestuurder: Bestuurder): Observable<Bestuurder> {
     const id = bestuurder.id;
     const url = `${this.bestuurderUrl}/${id}`;
     console.log("test ...");
     console.log(bestuurder);
     return this.http.put<Bestuurder>(url, bestuurder, httpOptions)
       .pipe(
        catchError(this.handleError<Bestuurder>(`updateBestuurder id=${id}`))
       );
  }

  createBestuurder(bestuurder: Bestuurder): Observable<Bestuurder> {
     return this.http.post<Bestuurder>(this.bestuurderUrl, bestuurder, httpOptions)
       .pipe( catchError(this.handleError<Bestuurder>(`CreateBestuurder`)));
  }

  setVoertuig(bestuurderId: number, voertuig: number) {
      console.log("set voertuig");
     this.getBestuurder(bestuurderId)
        .subscribe(bestuurder => {
            bestuurder.besVoertuig = voertuig;
            this.updateBestuurder(bestuurder).subscribe(newBestuurder => console.log("Bestuurder updated ..."));
        });
  }
  
  clearVoertuig(bestuurders: Bestuurder[], voertuigId: number) {
      let _results : Bestuurder[] = [];
      bestuurders.forEach(bestuurder => {
          if (bestuurder.besVoertuig === voertuigId) {
            bestuurder.besVoertuig = null;
            this.updateBestuurder(bestuurder).subscribe(newBestuurder => _results.push(newBestuurder));
          }
      });
      return _results;
  }

  clearTankkaart(bestuurders: Bestuurder[], tankkaartId: number) {
      let _results : Bestuurder[] = [];
      bestuurders.forEach(bestuurder => {
          if (bestuurder.besTankkaart === tankkaartId) {
            bestuurder.besTankkaart = null;
            this.updateBestuurder(bestuurder).subscribe(newBestuurder => _results.push(newBestuurder));
          }
      });
      return _results;
  }

  setTankkaart(bestuurderId: number, tankkaart: number) {
     this.getBestuurder(bestuurderId)
        .subscribe(bestuurder => {
            bestuurder.besTankkaart = tankkaart;
            this.updateBestuurder(bestuurder).subscribe(newBestuurder => console.log("Bestuurder updated ..."));
            console.log("set Tankkaart");
        });
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
