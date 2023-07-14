import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SessionLayoutComponent } from './layouts/session-layout/session-layout.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/session' },
  {
    path: 'administration',
    component: AdminLayoutComponent,
    loadChildren: () =>
      import('./modules/administration/administration.module').then(
        (m) => m.AdministrationModule
      ),
  },
  {
    path: 'session',
    component: SessionLayoutComponent,
    loadChildren: () =>
      import('./modules/session/session.module').then(
        (m) => m.SessionModule
      ),
  },
];


@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules, useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
