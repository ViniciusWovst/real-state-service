import { SquareMetrePriceCityModel } from '../../models/SquareMetrePrice/SquareMetrePriceCityModel';
import ISquareMetrePrice from './ISquareMetrePrice';
import { SquareMetrePriceCountry } from '../../models/SquareMetrePrice/SquareMetrePriceCountry';
import axios from 'axios';

export class INESquareMetrePriceService implements ISquareMetrePrice {

  parseDate(date: string): {month: number, year: number} {
    //const [monthStr, yearStr]
    const year = parseInt(date.substring(0,4));
    const month = parseInt(date.substring(4,6));
    return {month, year};
  }
  
  async getCitiesByDate(date: string): Promise<SquareMetrePriceCityModel[]> {
    const url = 'https://www.ine.pt/ine/json_indicador/pindica.jsp?op=2&varcd=0010042&lang=PT';
    interface IneCity {
      geocod: string;
      geodsg: string;
      dim_3: string;
      dim_3_t: string;
      sinal_conv: string;
      sinal_conv_desc: string;
      valor?: string;
  }
  interface iniResponse {
    Dados: {[key: string]: IneCity[]};
  }
  const APARTMENT = '1'; 
  const TOTAL = 'T'; 
  const CITY_CODE_SIZE = 7; 
  console.log(`${url}&Dim1=S3A${date}`);
  try {
    const response = await axios.get(`${url}&Dim1=S3A${date}`);
    console.log(response.status);
    const data: iniResponse = response.data[0];
    const citiesData: IneCity[] = data.Dados[date];
    const {month, year} = this.parseDate(date);
    console.log(`${url}&Dim1=S3A${date}`);
      const citiesPerMonth: SquareMetrePriceCityModel[] = citiesData.filter((item) => ((item.dim_3 != TOTAL) && (item.geocod.length === CITY_CODE_SIZE))).map((item) => {
          return {
            code: item.geocod,
            name: item.geodsg,
            currency: 'EUR',
            countryName: 'portugal',
            stateName: "",
            propertyType: item.dim_3 === APARTMENT ? 'apartment' : 'house',
            price: parseFloat(item.valor || '0'),
            month: month,
            year: year,
          };  
      });
      console.log(citiesPerMonth.filter((item) => item.name == 'Matosinhos'));
      return citiesPerMonth;
    }
  catch(e){ 
    console.log('error',e);
    return [];
  }
    
  }

  async getCountry(): Promise<SquareMetrePriceCountry> {
    return {
      code: 'PT', 
      name: 'Portugal',
      currency: 'EUR',
      month: 1,
      price:1,
      propertyType: 'apartment',
    } as SquareMetrePriceCountry;
  
  }

}