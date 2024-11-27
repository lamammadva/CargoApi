import { Column, Entity } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { Expose } from "class-transformer";
@Entity()
export class PageEntity extends CommonEntity{
  @Column()
  title:string;
  @Column({unique: true})
  slug:string;
  @Column('text', { nullable: true })
  content: string ;

}


