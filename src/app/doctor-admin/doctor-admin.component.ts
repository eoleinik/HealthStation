import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {AF} from "../../providers/af";
import {AngularFire} from 'angularfire2';
declare let jQuery:any;

@Component({
  selector: 'doctor-admin',
  templateUrl: './doctor-admin.component.html',
  styleUrls: ['./doctor-admin.component.css']
})
export class DoctorAdminComponent implements OnInit {

  public rooms;
  public staff;
  public staffToDelete = null;

  private account = {};
  public hospital;
  public hospitalName = "";

  constructor(private afService: AF, private af: AngularFire) { }

  ngOnInit() {

    this.af.auth.subscribe(account => {
      if (account) {
        this.account = account;
        this.afService.getAccountHospital(account.uid).subscribe(hospitalId => {
          this.hospital = hospitalId;
          this.afService.getHospitalName(hospitalId).subscribe(name => {
            this.hospitalName = name;
          })
        });
      } else {
        this.account = {};
        this.hospital = "";
      }
    });

    this.rooms = this.afService.getAccountsForHospital(this.hospital, ['Room']);
    this.staff = this.afService.getAccountsForHospital(this.hospital, ['Nurse', 'Doctor', 'Superuser']);

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

  deleteStaff(key) {
    if (key) {
      this.afService.removeAccount(key).then((success) => {
        jQuery('.modal').modal('hide');
        jQuery('body').removeClass('modal-open');
        jQuery('.modal-backdrop').remove();
      });
    }

    return false;
  }

}
