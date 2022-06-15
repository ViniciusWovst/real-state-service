
import { GeonJsonBase } from './GeoJsonBase';


export interface CityProperties {
  stateName: string;
  stateCode: string;
  
}

export interface City extends GeonJsonBase<CityProperties> {};