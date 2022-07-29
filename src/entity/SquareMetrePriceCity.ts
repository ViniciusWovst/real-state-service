import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { PropertyType } from "../models/squareMetrePrice/SquareMetrePriceBase";

@Entity()
export class SquareMetrePriceCity {

    @ObjectIdColumn()
    id: ObjectID

    @Column()
    code: string

    @Column()
    name: string

    @Column()
    price: number

    @Column()
    countryName: string
    
    @Column()
    stateName?: string
    
    @Column()
    period: Date

    @Column()
    currency: string
    
    @Column()
    propertyType: PropertyType

}
