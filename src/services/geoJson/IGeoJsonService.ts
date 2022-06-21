import { GeoJsonCity } from "../../models/geoJson/GeoJsonCity";
import { GeoJsonNeighborhood } from "../../models/geoJson/GeoJsonNeighborhood";
import { GeoJsonState } from "../../models/geoJson/GeoJsonState";

export default interface IGeoJsonService {
  getStates(): Promise<GeoJsonState>;
  getCities(): Promise<GeoJsonCity>;
  getNeighborhoods(): Promise<GeoJsonNeighborhood>;
}