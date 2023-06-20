import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoryComponent } from './history/history.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { StatStatusComponent } from './statistique/stat-status/stat-status.component';
import { StatChiffreAffaireComponent } from './statistique/stat-chiffre-affaire/stat-chiffre-affaire.component';
import { StatModePaiementStatusComponent } from './statistique/stat-mode-paiement-status/stat-mode-paiement-status.component';
import { StatModePaiementChiffreAffaireComponent } from './statistique/stat-mode-paiement-chiffre-affaire/stat-mode-paiement-chiffre-affaire.component';
import { StatExamenStatusComponent } from './statistique/stat-examen-status/stat-examen-status.component';
import { StatExamenChiffreAffaireComponent } from './statistique/stat-examen-chiffre-affaire/stat-examen-chiffre-affaire.component';
import { AdministrationRoutingModule } from './administration-routing.module';



@NgModule({
  declarations: [
    DashboardComponent,
    HistoryComponent,
    StatistiqueComponent,
    StatStatusComponent,
    StatChiffreAffaireComponent,
    StatModePaiementStatusComponent,
    StatModePaiementChiffreAffaireComponent,
    StatExamenStatusComponent,
    StatExamenChiffreAffaireComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
