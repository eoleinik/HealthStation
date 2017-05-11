import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AF} from "../../providers/af";
import {environment} from "../../environments/environment";
import { Location }                 from '@angular/common';
import * as firebase from "firebase";


@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {

  private hospital;
  public error;

  constructor(private afService: AF, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.hospital = params['hospitalid'];
    });
  }

  onSubmit(formData) {
    if(formData.valid) {

          let email = formData.value.email;
          let password = formData.value.password;
          let role = formData.value.role;
          let staffName = formData.value.staffName;

          // hacky way to create a new user without logging into his account
          let secondaryApp = firebase.initializeApp(environment.firebaseConfig, "Secondary");
          let copyAfService = this.afService;
          secondaryApp.auth().createUserWithEmailAndPassword(email, password).then(firebaseUser => {
              console.log("User " + firebaseUser.uid + " created successfully!");
              secondaryApp.auth().signOut();

              copyAfService.addAccountMetadata(firebaseUser.uid, role, this.hospital, staffName).then(success => {
                  this.location.back();
                }, (err) => this.error = err
              );

            }, (err) => this.error = err
          );
    }
  }

}
