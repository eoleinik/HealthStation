import { Component, OnInit } from '@angular/core';
import {AF} from "../../providers/af";
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.css']
})
export class LiveViewComponent implements OnInit {

  public userKey;
  public userObj;
  public firstName;
  public secondName;

  public account = {};

  constructor(public afService: AF, public af: AngularFire) {}

  ngOnInit() {
    this.af.auth.subscribe(account => {
      if(account) {
        this.account = account;

        this.afService.getLastTaggedUser(account.uid).subscribe(snapshot => {
          this.userKey = snapshot.LastTaggedUser;
          this.firstName = snapshot.LastTaggedFirstName;
          this.secondName = snapshot.LastTaggedSecondName;
          if (this.userKey != "") {
            this.afService.getPatient(this.userKey).subscribe(userObj => {
              this.userObj = userObj;
            })
          }
        })

      } else {
        this.account = {};
      }
    });
  }


}
