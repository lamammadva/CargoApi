import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDecimal, IsNumber, IsString } from "class-validator";

export class CreateTariffsDto {
    @Type()
    @ApiProperty()
    @IsString()
    countyName: string;
    
    @Type()

    @ApiProperty()
    @IsNumber()
    maxWeight: number;
    @Type()

    @ApiProperty()
    @IsNumber()
    minWeight: number;
    @Type()

    @ApiProperty()
    @IsString()
    currency: string;

    @Type()

    @ApiProperty()
    @IsNumber()
    price: number;
    @Type()

    @ApiProperty()
    @IsNumber()
    convertedPrice: number;

}