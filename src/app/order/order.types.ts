import { OrderEntity } from "src/database/entity/Order.entity";
import { PackageEntity } from "src/database/entity/Package.entity";
import { UserEntity } from "src/database/entity/User.entity";
import { FindOptionsSelect, FindOptionsSelectProperty } from "typeorm";

export const SELECTMYORDERS:FindOptionsSelect<OrderEntity> = {
    id:true,
    orderNo:true,
    createdAt:true,
    color:true,
    count:true,
    price:true,
    commission_price:true,
    amount:true,
    link:true,
    productName:true,
    imageUrl:true,
    status:true,
    store:true,
    country:true,
    deliveryPrice:true,
    paymentStatus:true,
    user:{
        id:true,
        name:true,
        lastname:true,
        customerCode:true,
        shippingBalance:true,
        orderBalance:true,
    }
    
 
}

