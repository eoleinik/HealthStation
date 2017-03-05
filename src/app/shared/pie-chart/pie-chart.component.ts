import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input()
  chartData:Array<any> =[];

  chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    showTooltips: false,
    animation : false
  };

  constructor() { }

  ngOnInit() {
  }

  public doughnutChartType:string = 'doughnut';


  extractData() {
    if (this.chartData.length == 0) return [];
    let given = this.chartData.map(series => (series.data)[series.data.length-1]);
    given.push(100.0 - given.reduce((a, b) => a+b, 0));
    return given;
  }

  extractLabels() {
    if (this.chartData.length == 0) return [];
    let given = this.chartData.map(series => series.label);
    given.push('Other');
    return given;
  }

  public chartClicked(e:any):void {
    // console.log(e);
  }

  public chartHovered(e:any):void {
    // console.log(e);
  }

}
