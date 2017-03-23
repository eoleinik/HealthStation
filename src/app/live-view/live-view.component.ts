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

  constructor(public afService: AF) {
  }

  ngOnInit() {
    this.afService.getLastTaggedUser().subscribe(snapshot => {
      console.log(snapshot);
      this.userKey = snapshot.LastTaggedUser;
      if (this.userKey != "") {
        this.afService.getPatient(this.userKey).subscribe(userObj => {
          console.log(userObj);
          this.userObj = userObj;
        })
      }
    })
  }

}
