import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import { BoardService, Card, Column } from '../board.service';
import { addCardAction } from '../boards.actions';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() column!: Column;
  @Input() apiUrl!: string;
  @Output() onCardCreated = new EventEmitter();
  cards$!: Observable<Card[]>;

  constructor(
    private readonly boardService: BoardService,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.cards$ = this.store.select((state: AppState) =>
      state.boards.cards.filter(({ columnId }) => this.column.id !== columnId)
    );
  }

  createCard() {
    return this.boardService
      .createCard(this.apiUrl, {
        boardId: this.column.boardId,
        columnId: this.column.id,
      })
      .subscribe((card) => this.store.dispatch(addCardAction({ card })));
  }
}
