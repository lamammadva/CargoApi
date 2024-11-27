import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";

export class carryingBalancePayment {
    @ApiProperty({default:[]})
    @IsArray()
    @IsNumber({},{each:true})
    packageId: number[];
    
}