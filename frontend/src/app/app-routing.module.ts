import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
