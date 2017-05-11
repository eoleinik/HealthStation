import { Component, OnInit } from '@angular/core';
import {AF} from "../../providers/af";
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

import * as firebase from "firebase";
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute} from "@angular/router";
import { Location }                 from '@angular/common';
import {Observable, Subject} from "rxjs";


@Component({
  selector: 'add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  private hospital;
  public error;
  public hardwareIdOk = Observable.from([false]).take(1);
  public hardwareId = "";
  private searchTerms = new Subject<string>();


  constructor(private af: AngularFire, private afService: AF, private route: ActivatedRoute, private location: Location) { }


  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.hospital = params['hospitalid'];
    });

    this.hardwareIdOk = this.searchTerms
      .debounceTime(100)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => {
        return term   // switch to new observable each time the term changes
          // return the http search observable
          ? this.afService.checkHardwareId(term)
          // or the observable of empty heroes if there was no search term
          : Observable.from([false]).take(1)
      })
      .catch(error => {
        console.log(error);
        return Observable.from([false]).take(1);
      });
  }



  onSubmit(formData) {
    if(formData.valid) {
      this.afService.checkHardwareId(formData.value.hardwareid).subscribe(status => {
        if (status) {
          let email = formData.value.email;
          let password = formData.value.password;
          let roomName = formData.value.roomName;

          // hacky way to create a new user without logging into his account
          let secondaryApp = firebase.initializeApp(environment.firebaseConfig, "Secondary");
          let copyAfService = this.afService;
          secondaryApp.auth().createUserWithEmailAndPassword(email, password).then(firebaseUser => {
            console.log("User " + firebaseUser.uid + " created successfully!");
            secondaryApp.auth().signOut();
            copyAfService.addIdMapping(formData.value.hardwareid, firebaseUser.uid).then(success => {
              copyAfService.addAccountMetadata(firebaseUser.uid, 'Room', this.hospital, roomName).then(success => {
                this.location.back();
              }, (err) => this.error = err
              );
            }, (err) => this.error = err
            );
          }, (err) => this.error = err
          );

        } else {
          console.log("Not allowed to add mapping");
          this.error = "This hardware id is not available."
        }
      })
    }
  }

}
