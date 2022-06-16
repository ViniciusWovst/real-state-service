import {Request, Response} from "express";
import { AppDataSource } from "../../data-source";
import {GeoCity} from "../../entity/GeoCity";
import * as mongodb from "mongodb";



/**
 * Loads geoCity by a given id.
 */


export async function geoCityGetByIdAction(request: Request, response: Response) {
    // get a post repository to perform operations with post
    const geoCityRepository = AppDataSource.manager.connection.getRepository(GeoCity);

    // load a post by a given post id
    const city = await geoCityRepository.findOne(mongodb.ObjectID(request.params.id));
    
    // if post was not found return 404 to the client
    if (!city) {
        response.status(404);
        response.end();
        return;
    }

    // return loaded post
    response.send(city);
}
