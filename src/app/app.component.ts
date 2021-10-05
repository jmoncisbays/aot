import { Component, OnInit, ViewChild } from '@angular/core';
import { IGame } from 'src/app/models/i-game';
import { GamesService } from 'src/app/services/repositories/games.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tableColumns: string[] = ['title', 'platform', 'score', 'genre', 'editors_choice'];
  gamesDataSource: MatTableDataSource<IGame> = new MatTableDataSource<IGame>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private gamesService: GamesService) {}

  ngOnInit() {
    this.gamesService.getAll().subscribe((data: IGame[]) => {
      this.gamesDataSource = new MatTableDataSource<IGame>(data);
      this.gamesDataSource.sort = this.sort;
      this.gamesDataSource.paginator = this.paginator;
    });
  }

  searchTitle(title: string) {
    this.gamesDataSource.filter = title;
  }

  viewAllGames() {
    this.gamesDataSource.filter = "";
  }
}
