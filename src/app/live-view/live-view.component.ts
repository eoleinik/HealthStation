import { Component, OnInit } from '@angular/core';
import {AF} from "../../providers/af";

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

  constructor(public afService: AF) {
  }

  ngOnInit() {
    this.afService.getLastTaggedUser().subscribe(snapshot => {
      this.userKey = snapshot.LastTaggedUser;
      this.firstName = snapshot.LastTaggedFirstName;
      this.secondName = snapshot.LastTaggedSecondName;
      if (this.userKey != "") {
        this.afService.getPatient(this.userKey).subscribe(userObj => {
          this.userObj = userObj;
        })
      }
    })
  }

}
