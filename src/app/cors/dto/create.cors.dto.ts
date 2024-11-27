import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class CreateCorsDto{
    @Type()
    @ApiProperty()
    @IsString()
    @IsOptional()
    logo?:string

    @Type()
    @ApiProperty()
    @IsString()
    @IsOptional()
    sitename?:string

    @Type()
    @IsString()
    @ApiProperty()
    @IsOptional()
    phone?:string


    @Type()
    @IsString()
    @ApiProperty()
    @IsOptional()
    address?:string


    @Type()
    @IsString()
    @ApiProperty()
    @IsOptional()
    workHours?:string



    @Type()
    @IsString()
    @ApiProperty()
    @IsOptional()
    email?:string


  

   
    


}