import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { BoardService, Card } from '../board.service';
import { removeCardAction } from '../boards.actions';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card!: Card;
  @Input() apiUrl!: string;

  constructor(
    private readonly boardService: BoardService,
    private readonly store: Store<AppState>
  ) {}

  public onModelChange() {
    this.boardService.updateCard(this.apiUrl, this.card).subscribe();
  }

  public removeCard() {
    this.boardService
      .removeCard(this.apiUrl, this.card)
      .subscribe(() =>
        this.store.dispatch(removeCardAction({ card: this.card }))
      );
  }
}
