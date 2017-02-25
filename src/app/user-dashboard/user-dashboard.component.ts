import { Component, OnInit } from '@angular/core';
import { AF } from "../../providers/af";
import { FirebaseListObservable } from "angularfire2";


@Component({
  selector: 'user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  public sensors: FirebaseListObservable<any>;

  constructor(public afService: AF) {

  }

  ngOnInit() {
    this.sensors = this.afService.getSensors();

  }

}
