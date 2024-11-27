import { PackageEntity } from "src/database/entity/Package.entity"
import { FindOptionsSelect } from "typeorm"

export const SELECTMYPACKAGES:FindOptionsSelect<PackageEntity> = {
    id:true,
    weight:true,
    trackingNumber:true,
    totalprice:true,
    status:true,
    paymentStatus:true,
    order: {
        productName:true,
        store:true,

    }
}

export const SELECTMYPACKAGESUPDATE:FindOptionsSelect<PackageEntity> = {
    id:true,
    weight:true,
    trackingNumber:true,
   
}