import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isStudent = true;

  constructor(
    public fireAuth: AngularFireAuth,
  ) {
  }
}
