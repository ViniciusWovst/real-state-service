import {Request, Response} from "express";
import { AppDataSource } from "../../data-source";
import {GeoCity} from "../../entity/GeoCity";


/**
 * Saves given post.
 */
export async function geoCitySaveAction(request: Request, response: Response) {

    // get a post repository to perform operations with post
    const cityRepository = AppDataSource.manager.connection.getRepository(GeoCity);

    // create a real post object from post json object sent over http
    const newCity = cityRepository.create(request.body);

    // save received post
    await cityRepository.save(newCity);

    // return saved post back
    response.send(newCity);
}