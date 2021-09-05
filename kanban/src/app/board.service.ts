import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppState } from './app.state';
import {
  addCardAction,
  removeCardAction,
  setBoardAction,
} from './boards.actions';

export interface Card {
  id: string;
  name: string;
  description: string;
  boardId: string;
  columnId: string;
}

export interface Column {
  id: string;
  name: string;
  boardId: string;
}

export interface Board {
  id: string;
  name: string;
}

export interface CompleteBoard extends Board {
  columns: Column[];
  cards: Card[];
}

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private boards = new Map<string, BehaviorSubject<Board>>();

  constructor(
    private readonly http: HttpClient,
    private readonly store: Store<AppState>
  ) {}

  fetchBoard(apiUrl: string, uuid: string): Observable<CompleteBoard> {
    return this.http.get<CompleteBoard>(`${apiUrl}/boards/${uuid}`).pipe(
      tap(() => this.initializeSee(apiUrl, uuid)),
      tap((board) => this.store.dispatch(setBoardAction({ board })))
    );
  }

  createCard(
    apiUrl: string,
    { boardId, columnId }: { columnId: string; boardId: string }
  ) {
    return this.http
      .post<Card>(`${apiUrl}/cards/`, { boardId, columnId })
      .pipe(tap((card) => this.store.dispatch(addCardAction({ card }))));
  }

  updateCard(apiUrl: string, card: Card) {
    return this.http.put<Board>(`${apiUrl}/cards/${card.id}`, card);
  }

  removeCard(apiUrl: string, card: Card) {
    return this.http
      .delete<Card>(`${apiUrl}/cards/${card.id}`)
      .pipe(tap((card) => this.store.dispatch(removeCardAction({ card }))));
  }

  private initializeSee(apiUrl: string, uuid: string) {
    const eventSource = new EventSource(`${apiUrl}/boards/${uuid}/sse`);
    eventSource.onmessage = ({ data }) => {
      const board: CompleteBoard = JSON.parse(data);
      console.group('SSE');
      console.log('Receive an update for board %o', board);
      console.groupEnd();
      this.store.dispatch(setBoardAction({ board }));
    };
    eventSource.onerror = () => this.initializeSee(apiUrl, uuid);
  }
}
