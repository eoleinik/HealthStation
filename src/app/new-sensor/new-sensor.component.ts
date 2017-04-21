import { Component, OnInit } from '@angular/core';
import {AF} from "../../providers/af";
import {FirebaseListObservable} from 'angularfire2';
import {ActivatedRoute, Params, Router} from "@angular/router";
import { Location }                 from '@angular/common';

@Component({
  selector: 'app-new-sensor',
  templateUrl: './new-sensor.component.html',
  styleUrls: ['./new-sensor.component.css']
})
export class NewSensorComponent implements OnInit {


  public chosenSensor;
  public configs: FirebaseListObservable<any>;
  public key;

  constructor(public afService: AF,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router
  ) { }

  ngOnInit() {
    this.configs = this.afService.getConfigs();
    this.route.params.subscribe(params => {
      this.key = params['id'];
    });
  }

  selectConfig(sensor) {
    this.chosenSensor = sensor;
  }

  goBack() {
    this.location.back();
  }

  addSensor() {
    console.log(this.chosenSensor);
    if (this.chosenSensor) {
      let obs = this.afService.addConfigForPatient(this.key, this.chosenSensor.$key);
      obs.then(result => this.router.navigate(['/patient-details', this.key]));
    }
  }

}
