
import { GeoJsonBase, PropertiesBase } from './GeoJsonBase';


export interface GeoJsonCityProperties extends PropertiesBase {
  stateName: string;
  stateCode: string;
  
}

export interface GeoJsonCity extends GeoJsonBase<GeoJsonCityProperties> {};