import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { IsDateString, IsPhoneNumber } from "class-validator";
import { Nationality, UserGender, UserRole } from "src/shared/enum/user.enum";
import * as bcrypt from "bcrypt"
import { OrderEntity } from "./Order.entity";
import { Expose, Transform } from "class-transformer";
@Entity()
export class UserEntity extends CommonEntity{

    @Column()
    email:string

    @Column()
    password:string
    
    @Column({ select: false })
    repeatPassword:string

    @Column()
    name:string

    @Column()
    lastname:string

    @Column({nullable:true,select: false,})
    @IsPhoneNumber(null)
    finnishcode:string

    @Column({nullable:true, select:false})
    phone:string

    @Column({nullable:true})
    @IsDateString()
    birth:Date
    
    @Column({ type: "enum", enum: UserGender ,nullable:true})
    gender: UserGender;

    @Column({type: "enum", enum: Nationality,nullable:true,select:false})
    nationality:Nationality

    @Column({nullable:true})
    svSerialNo:string



    @Column({type: "enum", enum:UserRole, array: true,
    nullable: true})
    role: UserRole[]

    @Column({nullable:true,select:false})
    address:string

    @Column({nullable:true,select:false})
    office:string  
    
    @Column({nullable:true,select:false})
    agreement:boolean

// TOKEN 
    @Column({nullable: true})
    activateToken: string;
    
    @Column({nullable: true})
    activateExpire:Date;
    userService: any;
 
    @BeforeInsert()
    beforeInsert(){
        this.password =  bcrypt.hashSync(this.password,10)
    }

    @Column({nullable: true,})
    customerCode:number
    @Column({nullable: true,type:'float', default: 0})
    shippingBalance:number  
    @Column({nullable: true,type: 'float', default: 0} )
    orderBalance:number  
    @OneToMany(()=>OrderEntity,(order)=>order.user)
    orders: OrderEntity[]

    get fullName(){
        return `${this.name} ${this.lastname}`
    }
 


}