import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { TableService } from './services/table.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HomeComponent } from './components/home/home.component';
import { BlackjackComponent } from './components/blackjack/blackjack.component';
import { HorsesComponent } from './components/horses/horses.component';
import { TableComponent } from './components/table/table.component';
import { ButtonsComponent } from './components/table/buttons/buttons.component';
import { FieldComponent } from './components/table/field/field.component';
import { CardsComponent } from './components/blackjack/cards/cards.component';
import { ControlComponent } from './components/blackjack/control/control.component';
import { BlackjackService } from './services/blackjack.service';
import { BjrxjsComponent } from './components/bjrxjs/bjrxjs.component';
import { BjbuttonsComponent } from './components/bjrxjs/bjbuttons/bjbuttons.component';
import { BjfieldComponent } from './components/bjrxjs/bjfield/bjfield.component';
import { BjrxjsService } from './services/bjrxjs.service';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    BlackjackComponent,
    HorsesComponent,
    TableComponent,
    ButtonsComponent,
    FieldComponent,
    CardsComponent,
    ControlComponent,
    BjrxjsComponent,
    BjbuttonsComponent,
    BjfieldComponent,
  ],
  imports: [AppRoutingModule, BrowserModule, FormsModule, HttpClientModule],
  providers: [BlackjackService, TableService, BjrxjsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
