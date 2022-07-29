import {Request, Response} from "express";
import { AppDataSource } from "../../data-source";
import {GeoCity} from "../../entity/GeoCity";
import * as mongodb from "mongodb";
import { SquareMetrePriceCity } from '../../entity/SquareMetrePriceCity';



import "datejs"
import { City } from '../../entity/City';
import { PropertyType } from '../../models/squareMetrePrice/SquareMetrePriceBase';
import { CityService } from "../../services/city/CityService";

/**
 * Loads geoCity by a given id.
 */

function getPropertyAverage(propertyType: PropertyType, data: SquareMetrePriceCity[]) {
  if (data.length === 0) return 0; 
  return data.filter(item => item.propertyType === propertyType).
    reduce((a , b) => a + b.price, 0)/ data.length;
}

export async function geoCityGetByIdAction(request: Request, response: Response) {

  const cityService = new CityService();
  const city = await cityService.getCity(request.params.id)
  // if post was not found return 404 to the client
  if (!city) {
    response.status(404);
    response.end();
    return;
}

      
    // return loaded post
    response.send(city);
}
