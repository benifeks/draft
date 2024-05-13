import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BlackjackComponent } from './components/blackjack/blackjack.component';
import { BjrxjsComponent } from './components/bjrxjs/bjrxjs.component';
import { HorsesComponent } from './components/horses/horses.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blackjack', component: BlackjackComponent },
  { path: 'bjrxjs', component: BjrxjsComponent },
  { path: 'horses', component: HorsesComponent },
  { path: 'table', component: TableComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
