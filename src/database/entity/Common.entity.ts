import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CommonEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number

    @CreateDateColumn()
    createdAt:Date

    @CreateDateColumn()
    updatedAt:Date
}