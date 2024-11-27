import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { ImageEntity } from "./Image.entity";
@Entity()
export class NewsEntity extends CommonEntity{
    @ManyToOne(()=>ImageEntity)
    image:ImageEntity

    @Column()
    title:string;

    @Column()
    description:string;
    
}