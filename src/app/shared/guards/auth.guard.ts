// import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { Observable } from 'rxjs';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  constructor(public authService: AuthService, public router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    if (this.authService.isLoggedIn !== true) {
      this.router.navigate(['/auth/login'])
    }
    return true;
  }
}
