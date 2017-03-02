import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class AF {

  selectedPatient;
  sensors: FirebaseListObservable<any>;

  constructor(public af: AngularFire) {
    this.sensors = this.getSensors()
  }

  getSensorsForPatient(userKey: string) {
    return this.af.database.list('Users/'+userKey+'/sensors');
  }

  getSensors() {
    return this.af.database.list('sensors/');
  }

  getMeasurementsForUserAndSensor(userKey: string, sensor: string) {
    return this.af.database.list('measurements/'+userKey+'/'+sensor, {
      query: {
        limitToLast: 20
      }
    });
  }

  getPatients() {
    return this.af.database.list('Users/');
  }

  getPatient(userKey: string) {
    return this.af.database.object('Users/'+userKey);
  }

  addSensorForPatient(userKey: string, sensor: any) {
    this.getSensorsForPatient(userKey).push({name: sensor});
  }

}
