import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DividerModule } from 'primeng/divider';
import { AppRoutingModule } from '../app-routing.module';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenuModule } from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
import { TableauComponent } from './tableau/tableau.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ChartModule} from 'primeng/chart';
import {ProgressBarModule} from 'primeng/progressbar';
import { CardMethodePaiementComponent } from './card/card-methode-paiement/card-methode-paiement.component';
import { CardModePaiementComponent } from './card/card-mode-paiement/card-mode-paiement.component';
import { CardResumeComponent } from './card/card-resume/card-resume.component';
import {TooltipModule} from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
import {InputSwitchModule} from 'primeng/inputswitch';
import { SharedModule } from "../shared/shared.module";




@NgModule({
    declarations: [NavBarComponent, PaginationComponent, TableauComponent, CardResumeComponent, CardModePaiementComponent, CardMethodePaiementComponent],
    exports: [NavBarComponent, PaginationComponent, TableauComponent, CardResumeComponent, CardMethodePaiementComponent, CardModePaiementComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DividerModule,
        AvatarModule,
        AvatarGroupModule,
        MenuModule,
        ButtonModule,
        TableModule,
        InputTextModule,
        CalendarModule,
        DropdownModule,
        TagModule,
        ProgressBarModule,
        ChartModule,
        TooltipModule,
        PaginatorModule,
        InputSwitchModule,
        SharedModule
    ]
})
export class ComponentsModule {}
