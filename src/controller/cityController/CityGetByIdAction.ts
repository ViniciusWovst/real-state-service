import {Request, Response} from "express";

import "datejs"
import { CityService } from "../../services/city/CityService";

/**
 * Loads City data by a given id.
 */

export async function cityGetByIdAction(request: Request, response: Response) {

  const cityService = new CityService();
  const city = await cityService.getCityData(request.params.id);


  // if post was not found return 404 to the client
  if (!city) {
    response.status(404);
    response.end();
    return;
}
    // return loaded city data
    response.send(city);
}
