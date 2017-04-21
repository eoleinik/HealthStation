import {
  Component, OnInit, Input,
  trigger,
  state,
  style,
  transition,
  animate, ChangeDetectorRef
} from '@angular/core';
import { AF } from "../../providers/af";
import {DatePipe} from "@angular/common";

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

import 'rxjs/add/operator/filter';


@Component({
  selector: 'sensor-graph',
  templateUrl: './sensor-graph.component.html',
  styleUrls: ['./sensor-graph.component.css'],
  animations: [
    trigger('state', [
      state('inactive', style({
        backgroundColor: 'rgba(255, 255, 255, 0)',

      })),
      state('active',   style({
        backgroundColor: 'green',
      })),
      transition('inactive => active', animate('20ms ease')),
      transition('active => inactive', animate('1000ms 500ms ease'))
    ])
  ]
})

export class SensorGraphComponent implements OnInit {

  @Input()
  configKey: string;

  @Input()
  userKey: string;

  configObj: Observable<any>;
  data = [{data: []}];
  labels = [];
  units = "";

  public STATE = "inactive";

  public animationDone($event) {
    if (this.STATE == 'active') {
      this.STATE = 'inactive';
      this.cdr.detectChanges();
    } else {
      // do nothing
    }
  }

  constructor(public afService: AF, public datepipe: DatePipe, private cdr: ChangeDetectorRef) {
  }

  public containsData() {
    return this.data.length > 0 && this.data.some(series => series.data.length != 0);
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
    //         });
    //       }
    //     );
    //   });
    // });

    this.configObj.subscribe(configObj => {
      let measurementsObservable = this.afService.getMeasurementsForUserAndSensor(this.userKey, configObj.SensorKey);
      measurementsObservable.subscribe(allTypes => {
        this.data = [];
        this.labels = [];
        Object.keys(configObj.TimeSeries).forEach(type => {
          this.afService.getSeriesName(configObj.SensorKey, configObj.TimeSeries[type].SeriesKey).subscribe(seriesName => {
            let selected = allTypes.find(aType => aType.$key == configObj.TimeSeries[type].SeriesKey);
            if (selected) {
              let measurements = [];
              let new_labels = [];
              let measKeys = Object.keys(selected);
              measKeys.filter(key => key != "$key").slice((measKeys.length>20)?measKeys.length-20:0).forEach(measKey => {
                measurements.push(selected[measKey].Value);
                let date = new Date(selected[measKey].Time);
                new_labels.push(this.datepipe.transform(date, 'MMM dd'));
              });
              if (new_labels.length > this.labels.length) {
                this.labels = new_labels
              } else {
                this.labels = this.labels.splice(0);
              }
              this.units = seriesName.Unit;
              let tempDict = {data: measurements, label: seriesName.Type};
              this.data.push(tempDict);
            }
          });
        });
      });

      measurementsObservable.$ref.on('child_changed', () => {
        this.STATE = 'active';
        this.cdr.detectChanges();
      });

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
    //         this.data.push(smth);
    //       })
    //     })
    //   });
    //
    // });

  }
}
