import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { Geometry } from '../models/geoJson/GeoJsonBase';
import { GeoJsonCityProperties } from './../models/geoJson/GeoJsonCity';

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
    properties: GeoJsonCityProperties

}
