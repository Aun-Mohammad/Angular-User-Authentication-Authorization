import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  constructor(public authService: AuthService) {

  }
  ngOnInit(): void {

  }

  value!: string;
  password: string = '';
  confirmPassword: string = '';


  onSignUp(form: NgForm) {
    if (form.valid && this.password === this.confirmPassword) {
      this.authService.SignUp(form.value.email, form.value.password)
      .then(() => {
        console.log('Form Submitted!', form.value);
      })
      .catch((error) => {
        window.alert(error.message);
      });
    }
  }

}
