import {Request, Response} from "express";
import { AppDataSource } from "../../data-source";
import {GeoCity} from "../../entity/GeoCity";

/**
 * Loads all posts from the database.
 */
export async function geoCityGetAllAction(request: Request, response: Response){

    // get a post repository to perform operations with post;
    const geoCityRepository = AppDataSource.manager.connection.getRepository(GeoCity);

    // load posts
    const cities = await geoCityRepository.find();
    const responseData = {
      features: cities,
      type: "FeatureCollection"
    }

    // return loaded posts
    response.send(responseData);
}
