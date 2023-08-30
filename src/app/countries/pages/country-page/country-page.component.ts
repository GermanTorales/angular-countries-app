import { switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent implements OnInit {
  public country?: Country;
  public CountryTranslations?: string[][];

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.countriesService.searchByAlphaCode(id)))
      .subscribe((country) => {
        if (!country) return this.router.navigateByUrl('countries');

        this.CountryTranslations = this.setCountryTranslations(country);

        console.log(country);

        return (this.country = country);
      });
  }

  private setCountryTranslations(country: Country): string[][] {
    return Object.entries(country.translations).map(([key, value]) => [
      key,
      value.common,
    ]);
  }
}
