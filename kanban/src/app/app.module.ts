import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { boardsReducer } from './boards.reducers';
import { CardComponent } from './card/card.component';
import { ColumnComponent } from './column/column.component';

@NgModule({
  declarations: [AppComponent, BoardComponent, ColumnComponent, CardComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ boards: boardsReducer }, {}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
