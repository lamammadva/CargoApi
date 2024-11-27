import { Column, Entity } from "typeorm";
import { CommonEntity } from "./Common.entity";
@Entity()
export class CorsEntity extends CommonEntity{
    @Column()
    logo:string
    @Column()
    sitename:string
    @Column()
    phone:string
    @Column()
    email:string
    @Column()
    address:string
    @Column()
    workHours:string

}