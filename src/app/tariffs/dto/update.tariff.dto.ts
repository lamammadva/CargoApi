import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDecimal, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTariffDto {
    @Type()
    @ApiProperty()
    @IsOptional()
    @IsString()
    countyName?: string;
    
    @Type()
    @IsOptional()
    @ApiProperty()
    @IsNumber()
    maxWeight?: number;


    @Type()
    @IsOptional()
    @ApiProperty()
    @IsNumber()
    minWeight?: number;


    @Type()
    @IsOptional()
    @ApiProperty()
    @IsString()
    currency?: string;

    @Type()
    @IsOptional()
    @ApiProperty()
    @IsNumber()
    price?: number;

    @Type()
    @IsOptional()
    @ApiProperty()
    @IsNumber()
    convertedPrice?: number;

}