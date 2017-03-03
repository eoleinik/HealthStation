import { Component, OnInit, Input } from '@angular/core';
import { AF } from "../../providers/af";
import {DatePipe} from "@angular/common";

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

import 'rxjs/add/operator/filter';



import { FirebaseListObservable, FirebaseObjectObservable } from "angularfire2";


@Component({
  selector: 'sensor-graph',
  templateUrl: './sensor-graph.component.html',
  styleUrls: ['./sensor-graph.component.css'],
})
export class SensorGraphComponent implements OnInit {

  @Input()
  configKey: string;

  @Input()
  userKey: string;

  configObj: Observable<any>;
  data = [{data: []}];
  labels = [];

  public showLegend = [false];

  constructor(public afService: AF, public datepipe: DatePipe) {
  }

  public containsData() {
    return this.data.some(series => series.data.length != 0); //some(series => series.data.length != 0);
  }

  ngOnInit() {
    this.configObj = this.afService.getConfig(this.configKey);

    // this.configObj.subscribe(configObj => {
    //
    //   this.afService.getMeasurementsForUserAndSensor(this.userKey, configObj.SensorKey).subscribe(snapshots => {
    //     this.data = [];
    //     snapshots.filter(series => Object.keys(configObj.TimeSeries).includes(series.$key))
    //       .forEach(aSeries => {
    //
    //         this.afService.getSeriesName(configObj.SensorKey, aSeries.$key).subscribe(seriesObj => {
    //           let tempDict = {data: measurements, label: seriesObj.Type};
    //           this.data.push(tempDict);
    //           console.log(this.data);
    //         });
    //       }
    //     );
    //   });
    // });

    this.configObj.subscribe(configObj => {
      this.afService.getMeasurementsForUserAndSensor(this.userKey, configObj.SensorKey).subscribe(allTypes => {
        this.data = [];
        this.labels = [];
        Object.keys(configObj.TimeSeries).forEach(type => {
          this.afService.getSeriesName(configObj.SensorKey, configObj.TimeSeries[type].SeriesKey).subscribe(seriesName => {
            let selected = allTypes.find(aType => aType.$key == configObj.TimeSeries[type].SeriesKey);
            let measurements = [];
            let new_labels = [];
            let measKeys = Object.keys(selected);
            measKeys.filter(key => key != "$key").slice(measKeys.length-20,).forEach(measKey => {
              measurements.push(selected[measKey].Value);
              let date = new Date(selected[measKey].Time);
              new_labels.push(this.datepipe.transform(date, 'MMM dd'));
            });
            if (new_labels.length > this.labels.length) {
              this.labels = new_labels
            } else {
              this.labels = this.labels.splice(0);
            }
            let tempDict = {data: measurements, label: seriesName.Type};
            this.data.push(tempDict);
          });
        });
      })
    });

    // let measurements = this.configObj.map(configuration => {
    //   return Object.keys(configuration.TimeSeries).map(type => {
    //       return this.afService.getSeriesName(configuration.SensorKey, type).map(sensorName => {
    //         return this.afService.getMeasurementsForUserAndSensorAndSeries(this.userKey, configuration.SensorKey, type)
    //           .map(seriesMeasurements => {
    //             return seriesMeasurements.map(m => m.Value);
    //           } ).map(measurements => {
    //             return {label: sensorName.Type, data: measurements};
    //           })
    //       });
    //   })
    // });

    // measurements.subscribe(allSeriesData => {
    //   this.data = [];
    //   allSeriesData.map(oneSeriesData => {
    //     oneSeriesData.subscribe(finalData => {
    //       finalData.subscribe(smth => {
    //         console.log(smth);
    //         this.data.push(smth);
    //       })
    //     })
    //   });
    //
    // });

  }
}
