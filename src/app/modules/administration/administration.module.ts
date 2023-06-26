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
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ComponentsModule } from 'src/app/components/components.module';
import { ProfilComponent } from './profil/profil.component';
import {TabViewModule} from 'primeng/tabview';
import {MenubarModule} from 'primeng/menubar';
import { StatPeriodeComponent } from './statistique/stat-periode/stat-periode.component';
import {ChartModule} from 'primeng/chart';
import {DividerModule} from 'primeng/divider';


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
    StatExamenChiffreAffaireComponent,
    ProfilComponent,
    StatPeriodeComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    ComponentsModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    TabViewModule,
    MenubarModule,
    ChartModule,
    DividerModule
  ]
})
export class AdministrationModule { }
