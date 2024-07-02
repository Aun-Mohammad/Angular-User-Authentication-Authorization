import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register'
      },
    ]
  }
]


@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
