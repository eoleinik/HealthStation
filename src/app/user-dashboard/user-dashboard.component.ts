import { Component, OnInit } from '@angular/core';
import { AF } from "../../providers/af";
import {FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {ActivatedRoute, Params} from "@angular/router";

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  public sensors: FirebaseListObservable<any>;
  public patient: FirebaseObjectObservable<any>;
  key: string;


  constructor(public afService: AF, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.key = params['id'];
      this.patient = this.afService.getPatient(this.key);
      this.sensors = this.afService.getSensors(this.key);
    });

  }

}
