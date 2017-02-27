import { Component, OnInit } from '@angular/core';
import {FirebaseListObservable} from "angularfire2";
import {AF} from "../../providers/af";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  public patients: FirebaseListObservable<any>;

  constructor(public afService: AF) { }

  ngOnInit() {
    this.patients = this.afService.getPatients();
  }

}
