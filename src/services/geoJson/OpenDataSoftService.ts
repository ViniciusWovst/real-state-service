import { GeoJsonCity, GeoJsonCityProperties } from "../../models/geoJson/GeoJsonCity";
import { GeoJsonState, GeoJsonStateProperties } from '../../models/geoJson/GeoJsonState';
import IGeoJsonService from "./IGeoJsonService";
import { GeoJsonNeighborhood, GeoJsonNeighborhoodProperties } from '../../models/geoJson/GeoJsonNeighborhood';
import axios from "axios";
import { Feature, GeoJsonBase } from "../../models/geoJson/GeoJsonBase";

export default class OpenDataSoftService implements IGeoJsonService {
  baseUrl: string = 'https://public.opendatasoft.com/explore/dataset';
  async getStates(): Promise<GeoJsonState> {
    const url = `${this.baseUrl}/georef-portugal-distrito-millesime/download/?format=geojson&timezone=Europe/London&lang=en`;
  
    const response = await axios.get(url);
    const data: GeoJsonBase<any> = response.data;
    
    const features: Feature<GeoJsonStateProperties>[] = data.features.map((item) => {
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

    const states: GeoJsonState = {
      type: data.type,
      features: features
    };

    return states
  }
  async getCities(): Promise<GeoJsonCity> {
    const url = `${this.baseUrl}/georef-portugal-concelho-millesime/download/?format=geojson&timezone=Europe/London&lang=en&refine.year=2019`;
  
    const response = await axios.get(url);
    const data: GeoJsonBase<any> = response.data;
    
    const features: Feature<GeoJsonCityProperties>[] = data.features.map((item) => {
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

    const cities: GeoJsonCity = {
      type: data.type,
      features: features
    };

    return cities;
  }
  async getNeighborhoods(): Promise<GeoJsonNeighborhood> {
    const url = `${this.baseUrl}/georef-portugal-freguesia-millesime/download/?format=geojson&timezone=Europe/London&lang=en`;
  
    const response = await axios.get(url);
    const data: GeoJsonBase<any> = response.data;
    console.log(response.status);
    const features: Feature<GeoJsonNeighborhoodProperties>[] = data.features.map((item) => {
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
    
    const neighborhood: GeoJsonNeighborhood = {
      type: data.type,
      features: features
    };

    return neighborhood;
  }

}