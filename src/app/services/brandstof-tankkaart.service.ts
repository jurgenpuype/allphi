import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BrandstofTankkaart } from '../models/brandstofTankkaart';
import { TankkaartBrandstofTankkaart } from '../models/tankkaartbrandstofTankkaart';

@Injectable({
  providedIn: 'root'
})
export class BrandstofTankkaartService {

  constructor(  private http: HttpClient ) { }
  
  private brandstofTankkaartUrl = 'http://galileiit-001-site1.htempurl.com/brandstoftankkaart';  // URL to web api
  private TankkaartbrandstofTankkaartUrl = 'http://galileiit-001-site1.htempurl.com/TankkaartbrandstofTankkaart';
  
  getBrandstoffenTankkaart(): Observable<BrandstofTankkaart[]> {
      return this.http.get<BrandstofTankkaart[]>(this.brandstofTankkaartUrl)
                    .pipe( catchError(this.handleError<BrandstofTankkaart[]>('getBrandstoffenTankkaart', [])) );
  }

  getBrandstofTankkaart(id: number): Observable<BrandstofTankkaart> {
     const url = `${this.brandstofTankkaartUrl}/${id}`;
     return this.http.get<BrandstofTankkaart>(url).pipe(
       //tap(_ => this.log(`fetched hero id=${id}`)),
       catchError(this.handleError<BrandstofTankkaart>(`getBrandstoffenTankkaart id=${id}`))
     );
  }
  
  getTankkaartBrandstoffen(id : number): Observable<TankkaartBrandstofTankkaart[]> {
     const url = `${this.TankkaartbrandstofTankkaartUrl}/${id}`;
      return this.http.get<TankkaartBrandstofTankkaart[]>(url)
                    .pipe( catchError(this.handleError<TankkaartBrandstofTankkaart[]>('getTankkaartBrandstoffen', [])) );
  };
  
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
