import {Injectable} from '@angular/core';
import {BusyIndicatorService} from '../../services/busy-indicator/busy-indicator.service';
import {StudentDetails} from './student-details';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  collection = this.afs.collection<any>('students');
  data$: Observable<StudentDetails[]> = this.afs.collection<StudentDetails>(
    'students',
    (ref) => ref.where('deleted', '==', false)
  ).valueChanges();

  constructor(
    public afs: AngularFirestore,
    public busyIndicator: BusyIndicatorService
  ) {
  }

  getServerTime(): any {
    return firebase.firestore.Timestamp.now().toDate();
  }

  getDocByUid(docId): Promise<any> {
    // const busyIndicatorId = this.busyIndicator.show();
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = this.collection.ref.doc(docId).get();
        // this.busyIndicator.hide(busyIndicatorId);
        resolve(docRef);
      } catch (e) {
        // this.busyIndicator.hide(busyIndicatorId);
        reject(e);
      }
    });
  }

  async addItem(uid: string): Promise<any> {
    const busyIndicatorId = this.busyIndicator.show();
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = this.collection.ref.doc(uid);
        await docRef.set({
          id: docRef.id,
          uid,
          deleted: false,
          createdOn: this.getServerTime(),
        });
        this.busyIndicator.hide(busyIndicatorId);
        resolve(docRef.id);
      } catch (e) {
        reject(e);
        this.busyIndicator.hide(busyIndicatorId);
      }
    });
  }

  async deleteItem(docId: string): Promise<any> {
    const busyIndicatorId = this.busyIndicator.show();
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = await this.collection.doc(docId);
        const doc = await docRef.get().toPromise();
        await docRef.set({...doc.data(), deleted: true});
        resolve('Deleted Successfully');
        this.busyIndicator.hide(busyIndicatorId);
      } catch (e) {
        reject(e);
        this.busyIndicator.hide(busyIndicatorId);
      }
    });
  }
}

