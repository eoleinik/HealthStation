import {Component, OnInit, Input} from '@angular/core';
import {AF} from "../../providers/af";
import {RegistrationForm} from "../../registration.model";

@Component({
  selector: 'patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit {

  @Input()
  public id;

  public hospitalId;

  @Input()
  public firstName;

  @Input()
  public secondName;

  public patient: RegistrationForm;

  constructor(public afService: AF) {
    this.patient = new RegistrationForm(this.id, this.firstName, this.secondName, '1970-01-01', "", 170, "email@gmail.com");
  }

  registerPatient() {
    let d: Date = new Date(this.patient.dob);
    this.afService.getCurrentHospital().subscribe(hospitalId => {
      this.afService.registerPatient(this.id, this.firstName, this.secondName, d.getTime(), this.patient.sex, this.patient.height, this.patient.email, hospitalId);
    });
  }

  ngOnInit() {

  }
}
