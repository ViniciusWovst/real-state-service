import {Request, Response} from "express";
import { CityService } from "../../services/city/CityService";


/**
 * Loads all cities from the database.
 */
export async function geoCityGetAllAction(request: Request, response: Response){
    const cityService = new CityService();
    const citiesResponse = await cityService.getCitiesJson();
    //const citiesResponse = await cityService.getCity('1308');
    const responseData = {
      features: citiesResponse,
      type: "FeatureCollection"
    }

    response.send(responseData);
}
