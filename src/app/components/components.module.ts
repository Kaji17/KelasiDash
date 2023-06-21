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


@NgModule({
  declarations: [NavBarComponent, PaginationComponent, TableauComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DividerModule,
    // AppRoutingModule,
    AvatarModule,
    AvatarGroupModule,
    MenuModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    TagModule
  ],
  exports: [NavBarComponent, PaginationComponent,TableauComponent],
})
export class ComponentsModule {}
