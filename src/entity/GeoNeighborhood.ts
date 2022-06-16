import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { Geometry } from '../models/CountryData/GeoJsonBase';
import { TNeighborhoodProperties } from "../models/CountryData/Neighborhood";


@Entity()
export class GeoNeighborhood {

    @ObjectIdColumn()
    id: ObjectID

    @Column({
      type: 'geometry',
      spatialFeatureType: 'Point',
      srid: 4326,
  })
    geometry: Geometry

    @Column()
    type: string

    @Column()
    country: string

    @Column()
    properties: TNeighborhoodProperties

}
