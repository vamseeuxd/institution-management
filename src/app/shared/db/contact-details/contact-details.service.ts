import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {BusyIndicatorService} from '../../services/busy-indicator/busy-indicator.service';

@Injectable({
  providedIn: 'root'
})
export class ContactDetailsService {
  private data: ContactDetails[] = [];
  data$: BehaviorSubject<ContactDetails[]> = new BehaviorSubject<ContactDetails[]>(this.data);

  constructor(public busyIndicator: BusyIndicatorService) {
  }

  addItem(item: ContactDetails): Promise<any> {
    const busyIndicatorId = this.busyIndicator.show();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        item.id = new Date().getTime().toString();
        this.data.push(item);
        this.data$.next(this.data);
        resolve('Done');
        this.busyIndicator.hide(busyIndicatorId);
      }, 50);
    });
  }

  updateItem(item: ContactDetails, id: string): Promise<any> {
    const busyIndicatorId = this.busyIndicator.show();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.data = this.data.map(value => {
          if (value.id === id) {
            return {...item, id};
          } else {
            return value;
          }
        });
        this.data$.next(this.data);
        resolve('Done');
        this.busyIndicator.hide(busyIndicatorId);
      }, 50);
    });
  }

  deleteItem(id: string): Promise<any> {
    const busyIndicatorId = this.busyIndicator.show();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.data = this.data.filter(value => value.id !== id);
        this.data$.next(this.data);
        resolve('Done');
        this.busyIndicator.hide(busyIndicatorId);
      }, 50);
    });
  }
}

export class ContactDetails {
  public id = '';
  public contactPerson = '';
  public continent = '';
  public country = '';
  public state = '';
  public district = '';
  public city = '';
  public address = '';
  public pin = '';
  public email = '';
  public mobile = '';
  public alternateMobile = '';
  public landline = '';
  public fax = '';
}
