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

  public configSelector;
  public selectedSensor = null;
  public availableSensors = [];
  public selectedMeasurement = null;
  public availableMeasurements = [];
  public selectedRepresentation = null;
  public availableRepresentations = [];

  constructor(public afService: AF,
              private route: ActivatedRoute,
              private location: Location
  ) { }

  ngOnInit() {
    this.configs = this.afService.getConfigs();
    this.route.params.subscribe(params => {
      this.key = params['id'];
    });

    this.afService.getConfigSelector().subscribe(configSelector => {
      this.configSelector = configSelector;
      this.afService
      this.availableSensors = Object.keys(configSelector);
    })
  }

  selectSensor(sensorId: string) {
    this.selectedSensor = sensorId;
    this.availableMeasurements = Object.keys(this.configSelector[sensorId]);
    this.availableRepresentations = [];
  }

  selectMeasurement(measurementId: string) {
    this.selectedMeasurement = measurementId;
    this.availableRepresentations = Object.keys(this.configSelector[this.selectedSensor][measurementId]);
  }

  selectRepresentation(representationId: string) {
    this.selectedRepresentation = representationId;
    this.chosenSensor = this.configSelector[this.selectedSensor][this.selectedMeasurement][representationId];
  }

  goBack() {
    this.location.back();
  }

  addSensor() {
    if (this.chosenSensor) {
      let obs = this.afService.addConfigForPatient(this.key, this.chosenSensor);
      obs.then(result => this.location.back());
    }
  }

}
