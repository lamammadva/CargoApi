import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class orderBalanceDto{
    @ApiProperty()
    @IsNumber()
    orderBalance:number
}