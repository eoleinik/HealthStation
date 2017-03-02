import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.css']
})
export class IndicatorComponent implements OnInit {

  @Input()
  public chartData: Array<any>;

  constructor() { }

  isIncreasing() {
    return this.chartData.length >= 2 && this.chartData[this.chartData.length - 1]-this.chartData[this.chartData.length - 2] >= 0;
  }

  isDecreasing() {
    return this.chartData.length >= 2 && this.chartData[this.chartData.length - 1]-this.chartData[this.chartData.length - 2] < 0;
  }

  ngOnInit() {

  }

}
