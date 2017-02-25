import { Component, OnInit, Input } from '@angular/core';
import { AF } from "../../providers/af";

import { FirebaseListObservable, FirebaseObjectObservable } from "angularfire2";


@Component({
  selector: 'sensor-graph',
  templateUrl: './sensor-graph.component.html',
  styleUrls: ['./sensor-graph.component.css']
})
export class SensorGraphComponent implements OnInit {

  @Input()
  sensor;

  data: FirebaseListObservable<any>;

  //set a property that holds a random color for our style.
  randomcolor = this.getRandomColor();

  //function to get random colors
  public getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++){
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  constructor(public afService: AF) { }

  ngOnInit() {
    this.data = this.afService.getMeasurementsForUserAndSensor(this.sensor.name);
  }

}
