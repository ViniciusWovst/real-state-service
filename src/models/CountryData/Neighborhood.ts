
import { TCityProperties } from './City';
import { GeonJsonBase } from './GeoJsonBase';


export type  TNeighborhoodProperties = TCityProperties  & {
  cityName: string;
  cityCode: string;

  
}

export interface Neighborhood extends GeonJsonBase<TNeighborhoodProperties> {};