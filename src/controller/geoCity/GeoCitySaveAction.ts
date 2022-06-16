import {Request, Response} from "express";
import { AppDataSource } from "../../data-source";
import {GeoCity} from "../../entity/GeoCity";


/**
 * Saves given post.
 */
export async function geoCitySaveAction(request: Request, response: Response) {

    // get a post repository to perform operations with post
    const postRepository = AppDataSource.manager.connection.getRepository(GeoCity);

    // create a real post object from post json object sent over http
    const newPost = postRepository.create(request.body);

    // save received post
    await postRepository.save(newPost);

    // return saved post back
    response.send(newPost);
}