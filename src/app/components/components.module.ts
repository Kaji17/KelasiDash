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



@NgModule({
  declarations: [NavBarComponent, PaginationComponent],
  imports: [
    CommonModule,
    DividerModule,
    AppRoutingModule,
    AvatarModule,
    AvatarGroupModule,
    MenuModule,
    ButtonModule
  ],
  exports: [NavBarComponent, PaginationComponent],
})
export class ComponentsModule {}
