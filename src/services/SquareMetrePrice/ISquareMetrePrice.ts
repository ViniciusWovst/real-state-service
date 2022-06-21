import { SquareMetrePriceCityModel } from "../../models/squareMetrePrice/SquareMetrePriceCityModel";
import { SquareMetrePriceCountry } from '../../models/squareMetrePrice/SquareMetrePriceCountry';

export default interface ISquareMetrePrice {
  getCitiesByDate (date: string): Promise<SquareMetrePriceCityModel[]>;
  getCountry (): Promise<SquareMetrePriceCountry>;
}