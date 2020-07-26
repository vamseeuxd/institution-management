import {Component, HostBinding, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BusyIndicatorService} from '../../../shared/services/busy-indicator/busy-indicator.service';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

export interface PageConfig {
  id: string;
  name: string;
  position: number;
  deleted?: boolean;
  createdOn?: any;
}

@Component({
  selector: 'app-dynamic-page-side-nav',
  templateUrl: './dynamic-page-side-nav.component.html',
  styleUrls: ['./dynamic-page-side-nav.component.scss']
})
export class DynamicPageSideNavComponent implements OnInit {

  @HostBinding('class') className = 'border-right-0 border mt-2 h-100 px-0';
  @HostBinding('style.width') width = '250px';

  constructor(
    public afs: AngularFirestore,
    public busyIndicator: BusyIndicatorService
  ) {
  }

  pagesCollection = this.afs.collection<PageConfig>('pages');

  pages$: Observable<PageConfig[]> = this.afs.collection<PageConfig>(
    'pages',
    ref => ref.where(
      'deleted',
      '==',
      false
    ).orderBy('position')
  ).valueChanges();

  selectedPage: PageConfig;

  getServerTime(): any {
    return firebase.firestore.Timestamp.now().seconds * 1000;
  }

  async addPage(inputElement: HTMLInputElement, position): Promise<any> {
    const pageName = inputElement.value;
    if (pageName && pageName.trim().length > 2) {
      const busyIndicatorId = this.busyIndicator.show();
      return new Promise(async (resolve, reject) => {
        try {
          const docRef = this.pagesCollection.ref.doc();
          await docRef.set({
            id: docRef.id,
            name: pageName.trim(),
            position,
            deleted: false,
            createdOn: this.getServerTime(),
          });
          this.busyIndicator.hide(busyIndicatorId);
          inputElement.value = '';
          resolve(docRef.id);
        } catch (e) {
          reject(e);
          this.busyIndicator.hide(busyIndicatorId);
        }
      });
    }
  }

  async deletePage(pageId: string): Promise<any> {
    const isConfirmed = confirm('Are you sure! Do you want to Delete Page?');
    if (isConfirmed) {
      const busyIndicatorId = this.busyIndicator.show();
      return new Promise(async (resolve, reject) => {
        try {
          const docRef = await this.pagesCollection.doc(pageId);
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

  changePosition(event: CdkDragDrop<PageConfig[]>, pages: PageConfig[]): void {
    const busyIndicatorId = this.busyIndicator.show();
    moveItemInArray(pages, event.previousIndex, event.currentIndex);
    const batch = this.afs.firestore.batch();
    pages.forEach((value, index) => {
      const pageRef = this.pagesCollection.doc(value.id).ref;
      batch.update(pageRef, {position: index});
    });
    batch.commit().then(() => {
      this.busyIndicator.hide(busyIndicatorId);
    }).catch(() => {
      this.busyIndicator.hide(busyIndicatorId);
    });
  }

  editPage(page: PageConfig): void {
    this.selectedPage = page;
  }

  updatePage(page: PageConfig, pageName: string): void {
    if (pageName && pageName.trim().length > 2) {
      const busyIndicatorId = this.busyIndicator.show();
      const pageRef = this.pagesCollection.doc(page.id).ref;
      pageRef.update({name: pageName.trim()}).then(value => {
        this.busyIndicator.hide(busyIndicatorId);
        this.selectedPage = null;
      }, reason => {
        this.busyIndicator.hide(busyIndicatorId);
      });
    }
  }

  getDocByUid(docId): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = this.pagesCollection.ref.doc(docId).get();
        resolve(docRef);
      } catch (e) {
        reject(e);
      }
    });
  }

  ngOnInit(): void {
  }

}
