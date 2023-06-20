import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminResetComponent } from './admin-reset/admin-reset.component';
import { AdminForgotComponent } from './admin-forgot/admin-forgot.component';
import { SessionRoutingModule } from './session-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminResetComponent,
    AdminForgotComponent
  ],
  imports: [
    CommonModule,
    SessionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule
  ]
})
export class SessionModule { }
