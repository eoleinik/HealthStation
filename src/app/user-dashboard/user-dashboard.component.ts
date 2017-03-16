import {Component, OnInit, Input} from '@angular/core';
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

  @Input()
  key: string;

  public configs: FirebaseListObservable<any>;
  public patient: FirebaseObjectObservable<any>;


  constructor(public afService: AF, private route: ActivatedRoute) {

  }

  ngOnInit() {
    if (!this.key) {
      this.route.params.subscribe(params => {
        this.key = params['id'];
        this.patient = this.afService.getPatient(this.key);
        this.configs = this.afService.getConfigsForPatient(this.key);
      });
    } else {
      this.patient = this.afService.getPatient(this.key);
      this.configs = this.afService.getConfigsForPatient(this.key);
    }
  }

}
