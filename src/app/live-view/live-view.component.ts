import { Component, OnInit } from '@angular/core';
import {AF} from "../../providers/af";

@Component({
  selector: 'live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.css']
})
export class LiveViewComponent implements OnInit {

  public userKey;

  constructor(public afService: AF) {
  }

  ngOnInit() {
    this.afService.getLastTaggedUser().subscribe(snapshot => {
      console.log(snapshot);
      this.userKey = snapshot.$value;
    })
  }

}
