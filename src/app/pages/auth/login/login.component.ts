import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';



@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) {

  }

  ngOnInit(): void {

  }

  value!: string;
  password: string = '';

  onSignIn(form: NgForm) {
    if (form.valid) {
      this.authService.SignIn(form.value.email, form.value.password)
        .then((result) => {
          console.log('SignIn Successful', result);
        })
        .catch((error) => {
          window.alert(error.message);
        });
    }
  }


  // getEmail(x: any) {

  //   console.log(x);
  // }
}
