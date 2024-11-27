import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { CargoStatus } from "src/shared/enum/order.enum";

export class updateOrderDto {
    @IsOptional()
    @ApiProperty()
    @IsNumber()
    deliveryPrice:number

    @IsOptional()
    @ApiProperty()
    @IsEnum(CargoStatus)
    status:CargoStatus

    @IsOptional()
    @ApiProperty()
    @IsString()
    paymentStatus:string


    

}