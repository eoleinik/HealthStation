import {Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'table-chart',
  templateUrl: './table-chart.component.html',
  styleUrls: ['./table-chart.component.css']
})
export class TableChartComponent implements OnInit {

  @Input()
  public chartData: Array<any>;


  @Input()
  public chartDates: Array<any>;

  constructor() {

  }

  ngOnInit() {

  }



}
