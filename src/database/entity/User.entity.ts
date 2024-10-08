import { BeforeInsert, Column, Entity } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { IsDateString, IsPhoneNumber } from "class-validator";
import { Nationality, UserGender } from "src/shared/enum/user.enum";
import * as bcrypt from "bcrypt"
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

    @Column({nullable:true,select: false})
    phone:string

    @Column({nullable:true})
    @IsDateString()
    birth:Date
    
    @Column({ type: "enum", enum: UserGender ,nullable:true,select:false},)
    gender: UserGender;

    @Column({type: "enum", enum: Nationality,nullable:true,select:false})
    nationality:Nationality

    @Column({nullable:true,select:false})
    svSerialNo:string

    // @Column({type: "enum", enum: Precinct})
    // precinct:Precinct

    @Column({nullable:true,select:false})
    address:string
    
    @Column({nullable:true,select:false})
    agreement:boolean

// TOKEN 
    @Column({nullable: true})
    activateToken: string;
    
    @Column({nullable: true})
    activateExpire:Date;
 
    @BeforeInsert()
    beforeInsert(){
        this.password =  bcrypt.hashSync(this.password,10)
    }


    get fullName(){
        return `${this.name} ${this.lastname}`
    }


}