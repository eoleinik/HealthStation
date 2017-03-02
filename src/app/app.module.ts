import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';

import { AF } from "../providers/af";
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SensorGraphComponent } from './sensor-graph/sensor-graph.component';
import { BarchartComponent } from './shared/barchart/barchart.component';
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './shared/line-chart/line-chart.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import {DatePipe} from "@angular/common";
import {CapitalizePipe} from "../pipes/capitalize.pipe";
import { NewSensorComponent } from './new-sensor/new-sensor.component';
import { IndicatorComponent } from './shared/indicator/indicator.component';


// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyCi0NPiuB2kLpQRT5mggyZprxhFfuvr3xo",
  authDomain: "ee5dashboard.firebaseapp.com",
  databaseURL: "https://ee5dashboard.firebaseio.com",
  storageBucket: "ee5dashboard.appspot.com",
  messagingSenderId: "848081157972"
};

const routes: Routes = [
  { path: '', redirectTo: 'choose-patient', pathMatch: 'full' },
  { path: 'choose-patient', component: PatientListComponent},
  { path: 'patient-details/:id', component: UserDashboardComponent},
  { path: 'add-sensor', component: NewSensorComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    SensorGraphComponent,
    BarchartComponent,
    LineChartComponent,
    PatientListComponent,
    CapitalizePipe,
    NewSensorComponent,
    IndicatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig),
    ChartsModule
  ],
  providers: [ AF, DatePipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
