import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './main/components/dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login/login.component';
import { CanActivateGuard } from './guards/can-activate.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'nawigacja',
    component: MainComponent,
    canActivate: [CanActivateGuard],
    children: [
      {
        path: 'fabryka',
        component: DashboardComponent,
      },
      {
        path: 'sklep',
        component: DashboardComponent,
      },
      {
        path: '**',
        redirectTo: 'fabryka',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivateGuard],
})
export class AppRoutingModule {}
