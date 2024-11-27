import { UserEntity } from "src/database/entity/User.entity";
import { FindOptionsSelect, FindOptionsSelectProperty } from "typeorm";

export const SELECTUSERFIELD:FindOptionsSelect<UserEntity> = {
    id:true,
    lastname:true,
    name:true,
    email:true,
    phone:true,
    birth:true,
    gender:true,
    address:true,
    svSerialNo:true,
    finnishcode:true,
    nationality:true,
    customerCode:true,
    shippingBalance :true,
    orderBalance: true,
    office:true,
    role:true,
    

}