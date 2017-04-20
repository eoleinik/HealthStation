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
import { TableChartComponent } from './shared/table-chart/table-chart.component';
import { PieChartComponent } from './shared/pie-chart/pie-chart.component';
import { LiveViewComponent } from './live-view/live-view.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';

// Must export the configKey
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
  { path: 'live', component: LiveViewComponent},
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
    IndicatorComponent,
    TableChartComponent,
    PieChartComponent,
    LiveViewComponent,
    PatientRegistrationComponent
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
