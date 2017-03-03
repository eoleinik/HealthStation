import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'line-chart',
  templateUrl: 'line-chart.component.html',
  styleUrls: ['line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input()
  public lineChartData:Array<any> = [{data: []}];

  @Input()
  public lineChartLabels:Array<any>;

  @Input()
  public showLegend;

  constructor() { }

  chart;

  ngOnInit() {
  }

  public lineChartOptions:any = {
    responsive: true,
    maintainAspectRatio: true
  };

  public lineChartColors:Array<any> = [

    {
      backgroundColor: 'rgba(50,205,50, 0.2)',
      borderColor: 'rgba(50,205,50,1)',
      pointBackgroundColor: 'rgba(50,205,50,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(50,205,50,1)'
    },

    {
      backgroundColor: 'rgba(192, 57, 43, 0.2)',
      borderColor: 'rgba(192, 57, 43,1.0)',
      pointBackgroundColor: 'rgba(192, 57, 43,1.0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(192, 57, 43,1.0)'
    },

  ];

  public lineChartType:string = 'line';

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e:any):void {
    // console.log(e);

    // this.randomize();
  }

  public chartHovered(e:any):void {
    // console.log(e);
  }

}


