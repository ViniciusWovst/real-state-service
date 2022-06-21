import { SquareMetrePriceCityModel } from "../../models/SquareMetrePrice/SquareMetrePriceCityModel";
import { SquareMetrePriceCountry } from '../../models/SquareMetrePrice/SquareMetrePriceCountry';

export default interface ISquareMetrePrice {
  getCitiesByDate (date: string): Promise<SquareMetrePriceCityModel[]>;
  getCountry (): Promise<SquareMetrePriceCountry>;
}