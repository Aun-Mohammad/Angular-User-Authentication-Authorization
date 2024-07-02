import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('../app/pages/auth/auth.module').then(m => m.AuthModule),
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
