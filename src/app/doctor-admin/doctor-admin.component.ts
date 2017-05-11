import { Component, OnInit } from '@angular/core';
import {AF} from "../../providers/af";
import {AngularFire} from 'angularfire2';


@Component({
  selector: 'doctor-admin',
  templateUrl: './doctor-admin.component.html',
  styleUrls: ['./doctor-admin.component.css']
})
export class DoctorAdminComponent implements OnInit {

  public rooms;
  public staff;

  private account = {};
  public hospital;

  constructor(private afService: AF, private af: AngularFire) { }

  ngOnInit() {

    this.af.auth.subscribe(account => {
      if (account) {
        this.account = account;
        this.afService.getAccountHospital(account.uid).subscribe(name => this.hospital = name);
      } else {
        this.account = {};
        this.hospital = "";
      }
    });

    this.rooms = this.afService.getAccountsForHospital('Hospital X', ['Room']);
    this.staff = this.afService.getAccountsForHospital('Hospital X', ['Nurse', 'Doctor', 'Superuser']);

  }

  deleteRoom(room) {
    if (room.$key) {
      this.afService.removeAccount(room.$key).then(success => {
        this.afService.emptyIdMapping(room.$key);
      }, reject => {
        console.log(reject);
      });
    }
    return false;
  }

}
