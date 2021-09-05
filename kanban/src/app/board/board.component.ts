import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import { Board, BoardService, Card, Column } from '../board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnChanges {
  @Input() uuid!: string;
  @Input() apiUrl!: string;

  board$!: Observable<Board | undefined>;
  columns$!: Observable<Column[]>;

  constructor(
    private readonly boardService: BoardService,
    private readonly store: Store<AppState>
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchBoard();
  }

  ngOnInit(): void {
    this.fetchBoard();
  }

  cardTrackBy(index: number, card: Card) {
    return card.id;
  }

  fetchBoard() {
    if (this.uuid === undefined) {
      return;
    }
    this.boardService.fetchBoard(this.apiUrl, this.uuid).subscribe();
    this.board$ = this.store.select((state: AppState) =>
      state.boards.boards.find((board) => board.id === this.uuid)
    );
    this.columns$ = this.store.select((state: AppState) =>
      state.boards.columns.filter(({ boardId }) => boardId === this.uuid)
    );
  }
}
