import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { UserEntity } from "./User.entity";
import { CargoStatus, PaymentStatus } from "src/shared/enum/order.enum";
import { PackageEntity } from "./Package.entity";
@Entity()
export class OrderEntity extends CommonEntity{
    @ManyToOne(()=>UserEntity,(user)=>user.orders,{onDelete:'CASCADE'})
    user:UserEntity
    @Column({nullable: true})
    link:string
    @Column({nullable: true})
    count:number
    @Column({nullable:true})
    color:string
    @Column({nullable:true})
    size:string
    @Column({nullable:true})
    note:string
    @Column({nullable:true,type:'boolean'})
    agreement:boolean
    @Column({nullable:true})
    orderNo:number
    @Column({default:'Turkey',nullable:true})
    country:string
    @Column({nullable:true,type:'float'})
    price:number
    @Column({nullable:true,type:'float'})
    amount:number
    @Column({nullable:true,type:'float'})
    commission_price:number
    @Column({nullable:true,type:'float'})
    deliveryPrice:number
    
    @OneToOne(()=>PackageEntity,)
    @JoinColumn()
    package:PackageEntity

    @Column({nullable:true})
    store:string
    @Column({nullable:true,select:false})
    productName:string
    
    @Column({nullable:true,select:false,})
    imageUrl:string
    @Column({default:CargoStatus.SIFARIS_VERILIB,nullable:true})
    status:CargoStatus
    @Column({default:PaymentStatus.PENDING, nullable:true})
    paymentStatus:string


    



}