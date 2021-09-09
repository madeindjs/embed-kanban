import { HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { ColumnComponent } from './column/column.component';

@NgModule({
  declarations: [AppComponent, BoardComponent, ColumnComponent, CardComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [BoardComponent],
})
export class AppModule {
  constructor(private readonly injector: Injector) {}
  ngDoBoostrap() {
    const board = createCustomElement(BoardComponent, {
      injector: this.injector,
    });
    customElements.define('kanban-board', board);
  }
}
