import { AppDataSource } from "./data-source"
import express from 'express';
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes"
import {Request, Response} from "express";
import https from "https";
import fs from "fs";
import cors from "cors";


AppDataSource.initialize().then(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    // register all application routes
    AppRoutes.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

    // run app
  https
  .createServer({
    key: fs.readFileSync("src/config/certificate/key.pem"),
    cert: fs.readFileSync("src/config/certificate/cert.pem"),
  },app)
  .listen(3001, ()=>{
    console.log('server is runing at port 3001')
  });
  app.get('/', (req,res)=>{
    res.send("Hello from express server.")
})

}).catch(error => console.error(error))
