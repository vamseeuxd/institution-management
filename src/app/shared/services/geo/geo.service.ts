import {Injectable} from '@angular/core';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map, switchMap, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {BusyIndicatorService} from '../busy-indicator/busy-indicator.service';

@Injectable()
export class GeoService {

  private selectedContinent$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private selectedCountry$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private selectedState$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private selectedDistrict$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  // tslint:disable-next-line:max-line-length
  continent$ = fromPromise(fetch('http://www.geonames.org/childrenJSON?geonameId=6295630').then(response => response.json())).pipe(map(value => value.geonames));
  countries$ = this.selectedContinent$.pipe(switchMap(this.geoApiCallBack.bind(this)));
  states$ = this.selectedCountry$.pipe(switchMap(this.geoApiCallBack.bind(this)));
  districts$ = this.selectedState$.pipe(switchMap(this.geoApiCallBack.bind(this)));
  cities$ = this.selectedDistrict$.pipe(switchMap(this.geoApiCallBack.bind(this)));

  constructor(public busyIndicator: BusyIndicatorService) {
  }

  private geoApiCallBack(geonameId: string): Observable<any[]> {
    if (geonameId && geonameId.trim().length > 0) {
      const busyIndicatorId = this.busyIndicator.show();
      return fromPromise(
        fetch('http://www.geonames.org/childrenJSON?geonameId=' + geonameId)
          .then(response => response.json())
      ).pipe(
        map(value => value.geonames),
        tap(x => {
          this.busyIndicator.hide(busyIndicatorId);
        })
      );
    } else {
      return of([]);
    }
  }

  setSelectedContinent(geoNameId: string): void {
    this.selectedContinent$.next(geoNameId);
  }

  setSelectedCountry(geoNameId: string): void {
    this.selectedCountry$.next(geoNameId);
  }

  setSelectedState(geoNameId: string): void {
    this.selectedState$.next(geoNameId);
  }

  setSelectedDistrict(geoNameId: string): void {
    this.selectedDistrict$.next(geoNameId);
  }

}
