import {geoCityGetAllAction} from "./controller/geoCityController/GeoCityGetAllAction";
import {geoCityGetByIdAction} from "./controller/geoCityController/GeoCityGetByIdAction";
import {Request, Response} from "express";
import { cityGetByIdAction } from "./controller/cityController/CityGetByIdAction";

/**
 * All application routes.
 */


 export interface Route {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  action:  (request: Request, response: Response) => Promise<void>;
}

export const AppRoutes: Route[] = [
    {
        path: "/geojson/cities",
        method: "get",
        action: geoCityGetAllAction,
    },
    {
        path: "/geojson/cities/:id",
        method: "get",
        action: geoCityGetByIdAction
    },
  {
      path: "/cities/:id",
      method: "get",
      action: cityGetByIdAction
  },
    /*{
        path: "/cities",
        method: "post",
        action: geoCitySaveAction
    }*/
];