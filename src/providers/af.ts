import {Injectable} from "@angular/core";
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/mergeAll';

import {Observable} from "rxjs";


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

  getConfigs() {
    return this.af.database.list('SensorConfigs/');
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

  getBMI(userKey: string, sensorKey: string, seriesKey: string){
    return this.af.database.list('MeasurementsF/'+userKey+'/'+sensorKey+'/'+seriesKey, {
      query: {
        limitToLast: 1
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
    return this.getConfigsForPatient(userKey).push({ConfigKey: configKey});
  }

  getSeriesName(sensorKey: string, seriesKey: string) {
    return this.af.database.object('SensorsF/'+sensorKey+'/Series/'+seriesKey);
  }

  getLastTaggedUser(roomId: string) {
    return this.af.database.object('Tags/'+roomId);
  }

  registerPatient(id: string, firstName: string, secondName: string, dob: number, sex: string, height: number, email: string) {
    return this.getPatients().update(id, {
      FirstName: firstName,
      SecondName: secondName,
      BirthDate: dob,
      Sex: sex,
      Height: height,
      Email: email
    });
  }

  addAccountMetadata(uid: string, Class: string, Hospital: string, Name: string) {
    return this.af.database.list('Accounts').update(uid, {
      Class: Class,
      Hospital: Hospital,
      Name: Name
    })
  }

  getAccountClass(id: string) {
    return this.af.database.object('Accounts/'+id).map(obj => obj.Class);
  }

  getAccountHospital(id: string) {
    return this.af.database.object('Accounts/'+id).map(obj => obj.Hospital);
  }

  getAccountsForHospital(hospital: string, accountClass: Array<string>): Observable<Array<any>> {
    let a: FirebaseListObservable<Array<any>> = this.af.database.list('Accounts', {
      query: {
        orderByChild: 'Hospital',
        equalTo: hospital
      }
    });
    return a.map(dataArray => dataArray.filter(item => accountClass.indexOf(item.Class) > -1));
  }

  removeAccount(uid: string) {
    return this.af.database.object('Accounts/'+uid).remove();
  }

  emptyIdMapping(uid: string) {
    let mappings = this.af.database.list('IDMapping/', {
      query: {
        orderByChild: 'UID',
        equalTo: uid
      }
    });
    return mappings.subscribe(mappingsList => {
      if (mappingsList.length) {
        this.af.database.object('IDMapping/'+mappingsList[0].$key).update({
          UID: ""
        });
      }
    });
  }

  checkHardwareId(hardwareId: string) {
    return this.af.database.object('IDMapping/'+hardwareId).map(obj => (!!obj && obj.UID !== undefined && obj.UID.length == 0));
  }

  addIdMapping(hardwareId: string, accountNr: string) {
    return this.af.database.list('IDMapping/').update(hardwareId, {
      UID: accountNr
    });
  }

}
