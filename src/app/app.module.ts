import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'


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

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    BlackjackComponent,
    HorsesComponent,
    TableComponent,
    ButtonsComponent,
    FieldComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [TableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
