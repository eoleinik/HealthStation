import {Injectable} from "@angular/core";
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/mergeAll';
import 'rxjs/add/operator/merge';

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

  getPatientsForHospital(hospitalId: string): FirebaseListObservable<any> {
    let patients = this.af.database.list('Hospitals/'+hospitalId+'/Patients') as Observable<any>;
    return patients.map(allPatients => {
      let patientObjects: Array<Observable<any>> = allPatients.map(patient => {
        return this.getPatient(patient.$key) as Observable<any>;
      });
      return Observable.combineLatest(patientObjects);
    }).mergeAll() as FirebaseListObservable<any>;
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

  registerPatient(id: string, firstName: string, secondName: string, dob: number, sex: string, height: number, email: string, hospitalId) {
    return this.getPatients().update(id, {
      FirstName: firstName,
      SecondName: secondName,
      BirthDate: dob,
      Sex: sex,
      Height: height,
      Email: email
    }).then(success => {
      this.af.database.list('Hospitals/'+hospitalId+'/Patients').update(id, {
        Admin: "False"
      });
    });
  }

  addAccountMetadata(uid: string, Class: string, Hospital: string, Name: string) {
    return this.af.database.list('Accounts').update(uid, {
      Class: Class,
      Hospital: Hospital,
      Name: Name
    })
  }

  getRoomName(uid: string) {
    return this.af.database.object('Accounts/'+uid).map(obj => obj.Name);
  }

  getAccountClass(id: string) {
    return this.af.database.object('Accounts/'+id).map(obj => obj.Class);
  }

  getAccountHospital(id: string) {
    return this.af.database.object('Accounts/'+id).map(obj => obj.Hospital);
  }

  getHospitalName(hospitalId: string) {
    return this.af.database.object('Hospitals/'+hospitalId).map(obj => obj.Name);
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

  getCurrentHospital(): Observable<string> {
    return this.af.auth.map(account => {
      if (account)
        return this.getAccountHospital(account.uid);
      else return Observable.from("");
    }).mergeAll();
  }

}
