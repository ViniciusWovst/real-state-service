import { City, CityProperties } from "../../models/CountryData/City";
import { State, StateProperties } from '../../models/CountryData/State';
import ICountryDataService from "./ICountryData";
import { Neighborhood, NeighborhoodProperties } from '../../models/CountryData/Neighborhood';
import axios from "axios";
import { Feature, GeonJsonBase } from "../../models/CountryData/GeoJsonBase";

export default class OpenDataSoftService implements ICountryDataService {
  baseUrl: string = 'https://public.opendatasoft.com/explore/dataset';
  async getStates(): Promise<State> {
    const url = `${this.baseUrl}/georef-portugal-distrito-millesime/download/?format=geojson&timezone=Europe/London&lang=en`;
  
    const response = await axios.get(url);
    const data: GeonJsonBase<any> = response.data;
    
    const features: Feature<StateProperties>[] = data.features.map((item) => {
      return {
        geometry: item.geometry,
        type: item.type,
        properties:{
          name: item.properties.dis_name,
          code: item.properties.dis_code,
          type: 'state',
          areaCode: item.properties.dis_area_code
        }
      };
    });

    const states: State = {
      type: data.type,
      features: features
    };

    return states
  }
  async getCities(): Promise<City> {
    const url = `${this.baseUrl}/georef-portugal-concelho-millesime/download/?format=geojson&timezone=Europe/London&lang=en`;
  
    const response = await axios.get(url);
    const data: GeonJsonBase<any> = response.data;
    
    const features: Feature<CityProperties>[] = data.features.map((item) => {
      return {
        geometry: item.geometry,
        type: item.type,
        properties:{
          stateName: item.properties.dis_name,
          stateCode: item.properties.dis_code,
          areaCode: item.properties.con_area_code,
          name: item.properties.con_name,
          code: item.properties.con_code,
          type: 'city'
          
        }
      };
    });

    const cities: City = {
      type: data.type,
      features: features
    };

    return cities;
  }
  async getNeighborhoods(): Promise<Neighborhood> {
    const url = `${this.baseUrl}/georef-portugal-freguesia-millesime/download/?format=geojson&timezone=Europe/London&lang=en`;
  
    const response = await axios.get(url);
    const data: GeonJsonBase<any> = response.data;
    console.log(response.status);
    const features: Feature<NeighborhoodProperties>[] = data.features.map((item) => {
      return {
        geometry: item.geometry,
        type: item.type,
        properties:{
            stateName: item.properties.dis_name,
            stateCode: item.properties.dis_code,
            cityCode: item.properties.con_code,
            cityName: item.properties.con_name,
            areaCode: item.properties.fre_area_code,
            name: item.properties.fre_name,
            code: item.properties.fre_code,
            type: 'neighborhood'
        }
      };
    });
    
    const neighborhood: Neighborhood = {
      type: data.type,
      features: features
    };

    return neighborhood;
  }

}