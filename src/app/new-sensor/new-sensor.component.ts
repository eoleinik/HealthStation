import { Component, OnInit } from '@angular/core';
import {AF} from "../../providers/af";

@Component({
  selector: 'app-new-sensor',
  templateUrl: './new-sensor.component.html',
  styleUrls: ['./new-sensor.component.css']
})
export class NewSensorComponent implements OnInit {


  chosenSensor;

  constructor(public afService: AF) { }

  ngOnInit() {
  }

  addSensor() {}

}
