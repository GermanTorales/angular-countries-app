import { Country } from './country.interface';
import { Region } from './region.type';

export interface IBy {
  input: string;
  countries: Country[];
}

export interface IByCapital extends IBy {}

export interface IByCountry extends IBy {}

export interface IByRegion extends IBy {
  input: Region;
}

export interface ILocalCache {
  byCapital: IByCapital;
  byCountry: IByCountry;
  byRegion: IByRegion;
}
