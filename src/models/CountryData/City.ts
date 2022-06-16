
import { GeonJsonBase } from './GeoJsonBase';


export interface TCityProperties {
  stateName: string;
  stateCode: string;
  
}

export interface City extends GeonJsonBase<TCityProperties> {};