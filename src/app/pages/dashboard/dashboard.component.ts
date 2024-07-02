import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { UserInterface } from 'src/app/shared/models/user.interface';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  // username: UserInterface['displayName'];
  user!: any;

  products: any[];
  constructor(public authService: AuthService) {

    authService.db.list('/products').valueChanges().subscribe((products) => {
      this.products = products;
      console.log(products);

    });
    // this.user = afAuth.authState;
  }

}
