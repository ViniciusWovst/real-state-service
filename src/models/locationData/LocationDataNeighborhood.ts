import { LocationDataBase } from "./LocationDataBase";

export interface LocationDataNeighborhood extends LocationDataBase {
  stateName: string;
  stateCode: string;
  cityName: string;
  cityCode: string;
};

