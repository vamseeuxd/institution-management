import {Injectable} from '@angular/core';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map, switchMap} from 'rxjs/operators';
import {BehaviorSubject, of} from 'rxjs';

const geoApiCallBack = (geonameId: string) => {
  if (geonameId && geonameId.trim().length > 0) {
    return fromPromise(
      fetch('http://www.geonames.org/childrenJSON?geonameId=' + geonameId)
        .then(response => response.json())
    ).pipe(
      map(value => value.geonames)
    );
  } else {
    return of([]);
  }
};

@Injectable()
export class GeoService {
  private selectedContinent$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private selectedCountry$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private selectedState$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private selectedDistrict$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  // tslint:disable-next-line:max-line-length
  continent$ = fromPromise(fetch('http://www.geonames.org/childrenJSON?geonameId=6295630').then(response => response.json())).pipe(map(value => value.geonames));
  countries$ = this.selectedContinent$.pipe(switchMap(geoApiCallBack));
  states$ = this.selectedCountry$.pipe(switchMap(geoApiCallBack));
  districts$ = this.selectedState$.pipe(switchMap(geoApiCallBack));
  cities$ = this.selectedDistrict$.pipe(switchMap(geoApiCallBack));

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
