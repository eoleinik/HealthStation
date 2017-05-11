import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/angularfire2";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/mergeMap';

import {AF} from "../providers/af";

@Injectable()
export class NurseGuard implements CanActivate {

  constructor(private auth: AngularFireAuth, private afService: AF, private router: Router) {}

  canActivate(): Observable<boolean> {
      return this.canActivatePure()
        .do(authenticated => {
          if (!authenticated) this.router.navigate([ '/login' ]);
        })
  }

  canActivatePure(): Observable<boolean> {
    return Observable.from(this.auth)
      .take(1)
      .map(state => {
        if (!state) return Observable.from([false]).take(1);
        return this.afService.getAccountClass(state.uid)
          .map(accountClass => (accountClass == 'Nurse' || accountClass == 'Doctor' || accountClass == 'Superuser'));
      }).mergeAll();   // since we have Observable<Observable<boolean>>
  }
}

@Injectable()
export class RoomGuard implements CanActivate {

  constructor(private auth: AngularFireAuth, private afService: AF, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.canActivatePure()
      .do(authenticated => {
        if (!authenticated) this.router.navigate([ '/login' ]);
      })
  }

  canActivatePure(): Observable<boolean> {
    return Observable.from(this.auth)
      .take(1)
      .map(state => {
        if (!state) return Observable.from([false]).take(1);
        return this.afService.getAccountClass(state.uid)
          .map(accountClass => accountClass == 'Room');
      }).mergeAll();   // since we have Observable<Observable<boolean>>
  }
}

@Injectable()
export class SuperuserGuard implements CanActivate {

  constructor(private auth: AngularFireAuth, private afService: AF, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.canActivatePure()
      .do(authenticated => {
        if (!authenticated) this.router.navigate([ '/login' ]);
      })
  }

  canActivatePure(): Observable<boolean> {
    return Observable.from(this.auth)
      .take(1)
      .map(state => {
        if (!state) return Observable.from([false]).take(1);
        return this.afService.getAccountClass(state.uid)
          .map(accountClass => (accountClass == 'Superuser'));
      }).mergeAll();   // since we have Observable<Observable<boolean>>
  }
}

@Injectable()
export class AuthStatus {

  constructor(private auth: AngularFireAuth, private afService: AF, private router: Router) {}

  isNurse() {
    let nurseGuard = new NurseGuard(this.auth, this.afService, this.router);
    return nurseGuard.canActivatePure();
  }

  isRoom() {
    let roomGuard = new RoomGuard(this.auth, this.afService, this.router);
    return roomGuard.canActivatePure();
  }

  isSuperuser() {
    let superuserGuard = new SuperuserGuard(this.auth, this.afService, this.router);
    return superuserGuard.canActivatePure();
  }

}
