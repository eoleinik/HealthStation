import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import {AF} from "../../providers/af";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  error: any;

  constructor(public af: AngularFire, private afService: AF, private router: Router) {
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.router.navigateByUrl('/choose-patient');
      }
    });
  }

  ngOnInit() {
  }

  onSubmit(formData) {
    if(formData.valid) {
      this.af.auth.login({
          email: formData.value.email,
          password: formData.value.password
        },
        {
          provider: AuthProviders.Password,
          method: AuthMethods.Password,
        }).then(
        (success) => {
          this.afService.getAccountClass(success.uid).subscribe(type => {
            if (type == 'Nurse' || type == 'Doctor') {
              this.router.navigate(['/choose-patient']);
            } else {
              this.router.navigate(['/live']);
            }
          })
        }).catch(
        (err) => {
          this.error = err;
        })
    }
  }

}
