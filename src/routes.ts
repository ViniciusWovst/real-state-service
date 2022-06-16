import {geoCityGetAllAction} from "./controller/geoCity/GeoCityGetAllAction";
import {geoCityGetByIdAction} from "./controller/geoCity/GeoCityGetByIdAction";
import {Request, Response} from "express";

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
        path: "/cities",
        method: "get",
        action: geoCityGetAllAction,
    },
    {
        path: "/cities/:id",
        method: "get",
        action: geoCityGetByIdAction
    },
    /*{
        path: "/cities",
        method: "post",
        action: geoCitySaveAction
    }*/
];