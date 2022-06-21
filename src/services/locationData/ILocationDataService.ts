import { LocationDataCity } from "../../models/locationData/LocationDataCity";
import { LocationDataNeighborhood } from "../../models/locationData/LocationDataNeighborhood";
import { LocationDataState } from "../../models/locationData/LocationDataState";

export default interface ILocationDataService {
  getStates(): Promise<LocationDataState[]>;
  getCities(): Promise<LocationDataCity[]>;
  getNeighborhoods(): Promise<LocationDataNeighborhood[]>;
}