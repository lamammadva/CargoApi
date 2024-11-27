import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { UserEntity } from "src/database/entity/User.entity";

export class CarriyingBalance{
    @ApiProperty()
    @IsNumber()
    shippingBalance:number


}