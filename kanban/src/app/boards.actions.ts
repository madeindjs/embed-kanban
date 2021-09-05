import { createAction, props } from '@ngrx/store';
import { Card, CompleteBoard } from './board.service';

export const setBoardAction = createAction(
  'setBoardAction',
  props<{ board: CompleteBoard }>()
);
export const addCardAction = createAction(
  'addCardAction',
  props<{ card: Card }>()
);
export const removeCardAction = createAction(
  'removeCardAction',
  props<{ card: Card }>()
);
