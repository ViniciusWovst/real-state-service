import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { PropertiesBase } from "../models/geoJson/GeoJsonBase";
import { Geometry } from '../models/geoJson/GeoJsonBase';


@Entity()
export class GeoState {

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
    properties: PropertiesBase

}
