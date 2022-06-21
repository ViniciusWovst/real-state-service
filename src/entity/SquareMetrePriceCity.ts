import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

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
    year: number

    @Column()
    month: number

    @Column()
    currency: string
    
    @Column()
    propertyType: string

}
