import { Component, OnInit, Input } from '@angular/core';
import { AF } from "../../providers/af";
import {DatePipe} from "@angular/common";


import { FirebaseListObservable, FirebaseObjectObservable } from "angularfire2";


@Component({
  selector: 'sensor-graph',
  templateUrl: './sensor-graph.component.html',
  styleUrls: ['./sensor-graph.component.css'],
})
export class SensorGraphComponent implements OnInit {

  @Input()
  sensor;

  @Input()
  userKey: string;

  rawData: FirebaseListObservable<any>;
  data = [];
  labels = [];

  constructor(public afService: AF, public datepipe: DatePipe) { }

  ngOnInit() {
    this.rawData = this.afService.getMeasurementsForUserAndSensor(this.userKey, this.sensor.name);

    this.rawData.subscribe(snapshots => {
      this.data = [];
      this.labels = [];
      snapshots.forEach(snapshot => {
        this.data.push(snapshot[this.sensor.name]);
        let date = new Date(snapshot.timestamp);
        let formatted = this.datepipe.transform(date, 'MMM dd');
        this.labels.push(formatted);
      });

      console.log(this.labels);
    });
  }

}
