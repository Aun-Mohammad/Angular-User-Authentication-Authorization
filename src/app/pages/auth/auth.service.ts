import { Injectable, NgZone } from '@angular/core';
import { UserInterface } from 'src/app/shared/models/user.interface';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  // users$: Observable<auth.User>;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  async SignIn(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('DATAA', result.user);

        this.SetUserData(result.user);
        console.log(result.user);

        this.afAuth.authState.subscribe(user => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
        return result;
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  async SignUp(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });

  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;

  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const userData: UserInterface = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      // emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/auth/login'])
    })
  }
}
