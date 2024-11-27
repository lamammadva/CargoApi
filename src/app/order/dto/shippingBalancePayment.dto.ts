import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";

export class shippingBalancePaymentDto{
    @ApiProperty()
    @IsArray()
    @IsNumber()
    packageId: number;
    
    
}