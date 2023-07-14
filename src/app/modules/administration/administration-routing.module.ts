import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoryComponent } from './history/history.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dash-board' },
  { path: 'dash-board', component: DashboardComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'statistiques', component: StatistiqueComponent },
  { path: 'profil', component: ProfilComponent },
  { path: '**', redirectTo: 'dash-board', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule {}
