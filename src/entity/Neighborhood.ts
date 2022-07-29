import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity()
export class Neighborhood {

    @ObjectIdColumn()
    id: ObjectID

    @Column()
    name: string

    @Column()
    code: string

    @Column()
    stateName: string

    @Column()
    stateCode: string

    @Column()
    cityName: string

    @Column()
    cityCode: string

    @Column()
    countryName: string

    @Column()
    habitableArea: number
}
