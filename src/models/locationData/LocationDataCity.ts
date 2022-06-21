import { LocationDataBase } from "./LocationDataBase";

export interface LocationDataCity extends LocationDataBase {
  image: string;
  stateName: string;
  stateCode: string;
};

