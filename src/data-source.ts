import "reflect-metadata";
import { DataSource } from "typeorm";
import { GeoState } from "./entity/GeoState";
import { GeoNeighborhood } from './entity/GeoNeighborhood';
import { GeoCity } from './entity/GeoCity';
import { SquareMetrePriceCity } from "./entity/SquareMetrePriceCity";

export const AppDataSource = new DataSource({
    type: "mongodb",
    database: "realzzy",
    host: "localhost",
    port: 27017,
    synchronize: true,
    logging: true,
    entities: [GeoState, GeoCity, GeoNeighborhood, SquareMetrePriceCity],
    migrations: ["src/database/migrations/*.ts"],
    migrationsTableName: "migrations", 
    appname: "realzzy", 
    subscribers: [],
})
