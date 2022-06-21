import { SquareMetrePriceBase } from './SquareMetrePriceBase';


export interface SquareMetrePriceCityModel extends SquareMetrePriceBase {
  countryName: string;
  stateName?: string;
}