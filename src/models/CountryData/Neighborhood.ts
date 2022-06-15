
import { CityProperties } from './City';
import { GeonJsonBase } from './GeoJsonBase';


export type  NeighborhoodProperties = CityProperties  & {
  cityName: string;
  cityCode: string;

  
}

export interface Neighborhood extends GeonJsonBase<NeighborhoodProperties> {};