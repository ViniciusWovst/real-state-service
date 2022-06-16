import { AppDataSource } from "./data-source"
import { GeoNeighborhood } from "./entity/GeoNeighborhood"
import { GeoState } from "./entity/GeoState"
import { User } from "./entity/User"
import OpenDataSoftService from "./services/CountryData/OpenDataSoft"
import { GeoCity } from './entity/GeoCity';
import express from 'express';
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes"
import {Request, Response} from "express";


AppDataSource.initialize().then(async (value) => {
    /*
    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

    //const listRepository = value.getRepository(GeoState);
    //const listCities = value.getRepository(GeoCity);
    const listNeighborhood = value.getRepository(GeoNeighborhood);

    

    //const states = new GeoState();
    //states.country = "portugal";
    const openDataSoftService = new OpenDataSoftService();
    const neighborhood = await openDataSoftService.getNeighborhoods();
    //const neighborhood = await openDataSoftService.getStates();
    //console.log('neighborhood', neighborhood.features[1]);
    const data = listNeighborhood.create({...neighborhood.features[10], country: "portugal"});

    const newList = await listNeighborhood.save(data);
    console.log('newList', newList);
    */

    //const states = new GeoState();
    //states.country = "portugal";
    const listCity = value.getRepository(GeoState);
    const openDataSoftService = new OpenDataSoftService();
    const cities = await openDataSoftService.getCities();
    //const neighborhood = await openDataSoftService.getStates();
    //console.log('neighborhood', neighborhood.features[1]);

    
    const features = cities.features;

     features.forEach(async(element, index) =>  {
      const data = listCity.create({...element, country: "portugal"});
      await listCity.save(data);
      console.log('index', index);
    });
    
    const app = express();
    app.use(bodyParser.json());

    // register all application routes
    AppRoutes.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

    // run app
    app.listen(3001);

}).catch(error => console.error(error))
