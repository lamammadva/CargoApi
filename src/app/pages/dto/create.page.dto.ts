import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNotEmpty, IsOptional, IsString, isNotEmpty } from "class-validator"

export class CreatePageDto{
    @Type()
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title:string
    @Type()
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    slug:string

    @Type()
    @ApiProperty()
    @IsString()
    @IsOptional()
    content:string



}