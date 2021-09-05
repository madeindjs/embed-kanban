import { createReducer, on } from '@ngrx/store';
import { Board, Card, Column } from './board.service';
import {
  addCardAction,
  removeCardAction,
  setBoardAction,
} from './boards.actions';

export interface BoardState {
  boards: Pick<Board, 'id' | 'name'>[];
  cards: Card[];
  columns: Column[];
}

export const initialState: BoardState = { boards: [], cards: [], columns: [] };

const _boardsReducer = createReducer(
  initialState,
  on(setBoardAction, (state, { board }) => {
    const boards = state.boards.filter(({ id }) => id !== board.id);
    boards.push({ id: board.id, name: board.name });

    const columns = state.columns.filter(({ boardId }) => boardId !== board.id);
    columns.push(...board.columns);

    const cards = state.cards.filter(({ boardId }) => boardId !== board.id);
    cards.push(...board.cards);

    return { boards, cards, columns };
  }),
  on(addCardAction, (state, { card }) => {
    const cards = state.cards;
    cards.push(card);

    return { ...state, cards };
  }),
  on(removeCardAction, (state, { card }) => {
    const cards = state.cards.filter(({ id }) => id !== card.id);

    return { ...state, cards };
  })
);

export function boardsReducer(state: any, action: any) {
  return _boardsReducer(state, action);
}
