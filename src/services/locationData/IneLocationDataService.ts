import axios from "axios";
import { LocationDataCity } from "../../models/locationData/LocationDataCity";
import { LocationDataNeighborhood } from "../../models/locationData/LocationDataNeighborhood";
import { LocationDataState } from "../../models/locationData/LocationDataState";
import ILocationDataService from "./ILocationDataService";

export class IneLocationDataService implements ILocationDataService {
  async getCities(): Promise<LocationDataCity[]> {
    return [];
  }

  async getStates(): Promise<LocationDataState[]> {
    return [];
  }

  async getNeighborhoods(): Promise<LocationDataNeighborhood[]> {
    const url = 'https://www.ine.pt/ine/json_indicador/pindica.jsp?op=2&varcd=0007822&lang=PT&Dim=S7A2021';
    interface IneData {
      geocod: string;
      geodsg: string;
      valor: string;
    }
    interface iniResponse {
      Dados: {[key: string]: IneData[]};
    }

    const STATE_CODE_SIZE = 2;
    const CITY_CODE_SIZE = 4;
    const NEIGHBORHOOD_CODE_SIZE = 6;
    const REFERENCE_YEAR = '2021';
    const COUNTRY_NAME = 'portugal';
  
    const response = await axios.get(url);
    console.log(response.statusText);

    const data: iniResponse = response.data[0]; 
    const allData: IneData[] = data.Dados[REFERENCE_YEAR];

    const state: IneData[] = allData.filter(item => item.geocod.length === STATE_CODE_SIZE);
    const cityList: IneData[] = allData.filter(item => item.geocod.length === CITY_CODE_SIZE);
    const neighborhoodsList: IneData[] = allData.filter(item => item.geocod.length === NEIGHBORHOOD_CODE_SIZE);

    const neighborhoodResult: LocationDataNeighborhood[] = []
    await state.forEach(async(state) => {
      const cities = cityList.filter(city => city.geocod.startsWith(state.geocod))
      await cities.forEach(async(city) => {
        const neighborhoods = neighborhoodsList.filter(neighborhood => neighborhood.geocod.startsWith(city.geocod));
        await neighborhoods.forEach(neighborhood => {
          neighborhoodResult.push(
            {
              cityCode: city.geocod,
              cityName: city.geodsg,
              stateCode: state.geocod,
              stateName: state.geodsg,
              name: neighborhood.geodsg,
              code: neighborhood.geocod,
              habitableArea: parseFloat(neighborhood.valor),
              countryName: COUNTRY_NAME
            }
          )
        })
      })
    })

    return neighborhoodResult;
  }

};