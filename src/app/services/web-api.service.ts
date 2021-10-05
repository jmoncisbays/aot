import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse , HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IGame } from '../models/i-game';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(private httpClient: HttpClient) { }

  getGames(): Observable<IGame[]> {
    return this.httpClient.get<IGame[]>(`${environment.dataFile}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg: string;

    // no response from WebAPI server
    if (error.status == 0) {
      errorMsg = "The backend application is not running";
    }
    else if (error.error instanceof ErrorEvent) {
      console.error('An error has occurred:', error.error.message);
      errorMsg = error.error.message;
    }
    else {
      errorMsg = error.error;
    }

    return throwError(errorMsg);
  };

}