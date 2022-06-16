import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { TCityProperties } from "../models/CountryData/City";
import { Geometry } from '../models/CountryData/GeoJsonBase';



@Entity()
export class GeoCity {

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
    properties: TCityProperties

}
