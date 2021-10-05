import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { GamesService } from 'src/app/services/repositories/games.service';

export interface IGame {
  title: string;
}

@Component({
  selector: 'app-autocomplete-game-titles',
  templateUrl: './autocomplete-game-titles.component.html',
  styleUrls: ['./autocomplete-game-titles.component.css']
})
export class AutocompleteGameTitlesComponent implements OnInit {
  formTitle = new FormControl();
  games: IGame[] = [];
  filteredGames$: Observable<IGame[]> = new Observable<IGame[]>();

  @Output() gameSelected: EventEmitter<string> = new EventEmitter();

  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.gamesService.getAll().subscribe((data: IGame[]) => {
      data.forEach(game => this._appendGame(game.title));
      this.games.sort();
      this.filteredGames$ = this.formTitle.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.games.slice())
      );
    });
  }

  displayFn(game: IGame): string {
    return game && game.title ? game.title : '';
  }

  private _filter(title: string): IGame[] {
    const filterValue = title.toLowerCase();

    return this.games.filter(game => game.title.toLowerCase().includes(filterValue));
  }

  gameOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.gameSelected.emit(event.option.viewValue);
  }

  private _appendGame(title: string) {
    if (title == null) return;
    if (this.games.some(game => game.title === title) == false) this.games.push(<IGame> {title: title});
  }

  clear() {
    this.formTitle.reset();
  }
}
