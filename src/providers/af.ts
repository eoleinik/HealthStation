import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class AF {

  selectedPatient;

  constructor(public af: AngularFire) {
  }

  getSensors(userKey: string) {
    return this.af.database.list('Users/'+userKey+'/sensors');
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

}
