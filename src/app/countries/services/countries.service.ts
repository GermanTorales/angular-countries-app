import { Observable, catchError, map, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Country } from '../interfaces/country.interface';
import { ILocalCache } from '../interfaces/local-cache.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private urlBase: string = 'https://restcountries.com/v3.1';

  public localCache: ILocalCache = {
    byCapital: {
      input: '',
      countries: [],
    },
    byCountry: {
      input: '',
      countries: [],
    },
    byRegion: {
      input: '',
      countries: [],
    },
  };

  constructor(private http: HttpClient) {}

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(catchError((error) => of([])));
  }

  searchByAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.urlBase}/alpha/${code}`).pipe(
      map((countries) => countries[0] || null),
      catchError((error) => of(null))
    );
  }

  searchByCapital(term: string): Observable<Country[]> {
    const url: string = `${this.urlBase}/capital/${term}`;

    return this.getCountriesRequest(url).pipe(
      tap((countries) => {
        this.localCache.byCapital = { input: term, countries };
      })
    );
  }

  searchByCountry(term: string): Observable<Country[]> {
    const url: string = `${this.urlBase}/name/${term}`;

    return this.getCountriesRequest(url).pipe(
      tap((countries) => {
        this.localCache.byCountry = { input: term, countries };
      })
    );
  }

  searchByRegion(term: Region): Observable<Country[]> {
    const url: string = `${this.urlBase}/region/${term}`;

    return this.getCountriesRequest(url).pipe(
      tap((countries) => {
        this.localCache.byRegion = { input: term, countries };
      })
    );
  }
}
