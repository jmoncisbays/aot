import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from '../web-api.service';
import { IGame } from '../../models/i-game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private webApi: WebApiService) { }

  getAll(): Observable<IGame[]> {
    return this.webApi.getGames();
  }

}

