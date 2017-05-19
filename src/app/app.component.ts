import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { AngularFire, AuthProviders, AuthMethods, AngularFireAuth } from 'angularfire2';
import {NurseGuard, RoomGuard, SuperuserGuard, AuthStatus} from "./auth.service";
import {AF} from "../providers/af";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  public hospitalName = "";

  user = {};

  constructor(private auth: AngularFireAuth, private afService: AF, public af: AngularFire, private router: Router, public authStatus: AuthStatus) {
    this.af.auth.subscribe(user => {
      if(user) {
        this.user = user;
      } else {
        this.user = {};
      }
    });
  }

  ngOnInit() {
    this.afService.getCurrentHospital().subscribe(hospitalId => {
      this.afService.getHospitalName(hospitalId).subscribe(hospitalName => {
        this.hospitalName = hospitalName;
      });
    })
  }

  logout() {
    this.af.auth.logout().then(success => {
        this.hospitalName = "";
        this.router.navigateByUrl('/login')
    });
  }

}
