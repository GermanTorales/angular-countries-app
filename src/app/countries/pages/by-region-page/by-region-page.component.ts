import { Component, OnInit } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = [];
  public selectedRegion?: Region;
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.localCache.byRegion.countries;
    this.selectedRegion = this.countriesService.localCache.byRegion.input;
  }

  search(region: Region): void {
    this.isLoading = true;

    this.countriesService.searchByRegion(region).subscribe((countries) => {
      this.countries = countries;
      this.selectedRegion = region;
      this.isLoading = false;
    });
  }
}
