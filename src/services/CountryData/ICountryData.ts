import { City } from "../../models/CountryData/City";
import { Neighborhood } from "../../models/CountryData/Neighborhood";
import { State } from "../../models/CountryData/State";

export default interface ICountryDataService {
  getStates(): Promise<State>;
  getCities(): Promise<City>;
  getNeighborhoods(): Promise<Neighborhood>;
}