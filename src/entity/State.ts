import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity()
export class State {

    @ObjectIdColumn()
    id: ObjectID

    @Column()
    image: string

    @Column()
    name: string

    @Column()
    code: string

    @Column()
    countryName: string

    @Column()
    habitableArea: number
}
