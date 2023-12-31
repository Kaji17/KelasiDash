import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminForgotComponent } from './admin-forgot/admin-forgot.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminResetComponent } from './admin-reset/admin-reset.component';


const routes: Routes = [
  { path: '', component: AdminLoginComponent },
  { path: 'forgot-password', component: AdminForgotComponent },
  { path: 'reset-password', component: AdminResetComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule { }
