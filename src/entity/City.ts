import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity()
export class City {

    @ObjectIdColumn()
    id: ObjectID

    @Column()
    image: string

    @Column()
    name: string

    @Column()
    code: string

    @Column()
    stateName: string

    @Column()
    stateCode: string

    @Column()
    countryName: string

    @Column()
    habitableArea: number
}
