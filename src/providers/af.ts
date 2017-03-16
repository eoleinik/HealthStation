import {Injectable} from "@angular/core";
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class AF {

  constructor(public af: AngularFire) {
  }

  getConfigsForPatient(userKey: string) {
    return this.af.database.list('UsersF/'+userKey+'/Configurations');
  }

  getConfig(configKey: string) {
    return this.af.database.object('SensorConfigs/'+configKey);
  }

  getMeasurementsForUserAndSensor(userKey: string, sensorKey: string) {
    return this.af.database.list('MeasurementsF/'+userKey+'/'+sensorKey);
  }

  getMeasurementsForUserAndSensorAndSeries(userKey: string, sensorKey: string, seriesKey: string) {
    return this.af.database.list('MeasurementsF/'+userKey+'/'+sensorKey+'/'+seriesKey, {
      query: {
        limitToLast: 20
      }
    });
  }

  getPatients() {
    return this.af.database.list('UsersF/');
  }

  getPatient(userKey: string) {
    return this.af.database.object('UsersF/'+userKey);
  }

  addConfigForPatient(userKey: string, configKey: string) {
    this.getConfigsForPatient(userKey).push({name: configKey});
  }

  getSeriesName(sensorKey: string, seriesKey: string) {
    return this.af.database.object('SensorsF/'+sensorKey+'/Series/'+seriesKey);
  }

  getLastTaggedUser() {
    return this.af.database.object('Tags/LastTaggedUser');
  }

}
