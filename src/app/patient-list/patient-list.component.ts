import { Component, OnInit } from '@angular/core';
import {FirebaseListObservable, AngularFire} from "angularfire2";
import {AF} from "../../providers/af";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  public patients: FirebaseListObservable<any>;

  public patientStatus = {};

  constructor(public afService: AF, public af: AngularFire) { }

  determineColor(patient) {
    let observable = this.afService.getBMI(patient.$key, 'Sens1', 'S3');
    observable.subscribe(data => {
      let BMI = data[0] ? data[0].Value : null;
      let status = 'default';
      // determine status
      if (BMI < 18.5) {
        status = 'danger';
      }
      else if (BMI < 25){
        status = 'success';
      }
      else if (BMI < 30) {
        status = 'warning';
      }
      else if (BMI >= 30) {
        status = 'danger';
      }
      this.patientStatus[patient.$key] = status;
    });
  }

  ngOnInit() {
    this.afService.getCurrentHospital().subscribe(hospitalId => {
        this.patients = this.afService.getPatientsForHospital(hospitalId);
        this.patients.subscribe(allPatients => {
          allPatients.forEach(patient => {
            this.determineColor(patient);
          })
        })
      });
  }

}
