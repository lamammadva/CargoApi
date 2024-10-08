import { Column, Entity } from "typeorm";
import { CommonEntity } from "./Common.entity";
@Entity()
export class CorsEntity
 extends CommonEntity{
    @Column()
    logo:string
    @Column()
    sitename:string
    @Column()
    aboutus:string
    @Column()
    address:string
    @Column()
    phoneNumber :string
    @Column()
    email:string
    @Column()
    weekdayHours:string
    @Column()
    saturdayHours:string


}