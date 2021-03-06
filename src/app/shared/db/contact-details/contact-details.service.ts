import {Injectable} from '@angular/core';
import {BusyIndicatorService} from '../../services/busy-indicator/busy-indicator.service';
import {ContactDetails} from './contact-details';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactDetailsService {
  contactDetailsCollection = this.afs.collection<any>('contact-details');
  data$: Observable<ContactDetails[]> = this.afs.collection<ContactDetails>(
    'contact-details',
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
        const docRef = this.contactDetailsCollection.ref.doc(docId).get();
        // this.busyIndicator.hide(busyIndicatorId);
        resolve(docRef);
      } catch (e) {
        // this.busyIndicator.hide(busyIndicatorId);
        reject(e);
      }
    });
  }

  async addItem(item: ContactDetails): Promise<any> {
    const busyIndicatorId = this.busyIndicator.show();
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = this.contactDetailsCollection.ref.doc(item.uid);
        await docRef.set({
          id: docRef.id,
          ...item,
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

  async updateItem(item: ContactDetails, docId: string): Promise<any> {
    const busyIndicatorId = this.busyIndicator.show();
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = this.contactDetailsCollection.ref.doc(docId);
        await docRef.set({
          id: docRef.id,
          ...item,
          deleted: false,
          updatedOn: this.getServerTime(),
        });
        this.busyIndicator.hide(busyIndicatorId);
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
        const docRef = await this.contactDetailsCollection.doc(docId);
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

