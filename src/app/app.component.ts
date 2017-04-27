import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { AngularFire, AuthProviders, AuthMethods, AngularFireAuth } from 'angularfire2';
import {NurseGuard, RoomGuard} from "./auth.service";
import {AF} from "../providers/af";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  user = {};

  constructor(private auth: AngularFireAuth, private afService: AF, public af: AngularFire, private router: Router) {
    this.af.auth.subscribe(user => {
      if(user) {
        this.user = user;
      } else {
        this.user = {};
      }
    });
  }

  logout() {
    this.af.auth.logout().then(success =>
      this.router.navigateByUrl('/login')
    );
  }

  isNurse() {
    console.log('hi');
    let nurseGuard = new NurseGuard(this.auth, this.afService, this.router);
    return nurseGuard.canActivatePure();
  }

  isRoom() {
    let roomGuard = new RoomGuard(this.auth, this.afService, this.router);
    return roomGuard.canActivatePure();
  }



}
