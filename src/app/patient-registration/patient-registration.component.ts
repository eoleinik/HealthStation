import {Component, OnInit, Input} from '@angular/core';
import {AF} from "../../providers/af";

@Component({
  selector: 'patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit {

  @Input()
  public id;

  constructor(public afService: AF) { }

  ngOnInit() {

  }

}
