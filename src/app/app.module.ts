import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';

import { AF } from "../providers/af";
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SensorGraphComponent } from './sensor-graph/sensor-graph.component';


// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyCi0NPiuB2kLpQRT5mggyZprxhFfuvr3xo",
  authDomain: "ee5dashboard.firebaseapp.com",
  databaseURL: "https://ee5dashboard.firebaseio.com",
  storageBucket: "ee5dashboard.appspot.com",
  messagingSenderId: "848081157972"
};

@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    SensorGraphComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [ AF ],
  bootstrap: [AppComponent]
})
export class AppModule { }
