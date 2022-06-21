
import { GeoJsonCityProperties } from './GeoJsonCity';
import { GeoJsonBase } from './GeoJsonBase';


export type  GeoJsonNeighborhoodProperties = GeoJsonCityProperties  & {
  cityName: string;
  cityCode: string;

  
}

export interface GeoJsonNeighborhood extends GeoJsonBase<GeoJsonNeighborhoodProperties> {};