import { Column, Entity, OneToMany } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { PackageEntity } from "./Package.entity";
@Entity()
export class TariffsEntity extends CommonEntity{
    @Column()
    countyName: string;
    @Column('float')
    maxWeight: number
    @Column('float')
    minWeight: number
    @Column()
    currency: string
    @Column('float')
    price: number
    @Column('float')
    convertedPrice: number
    @OneToMany(()=>PackageEntity,(packages)=>packages.tariff)
    packages: PackageEntity[]
}