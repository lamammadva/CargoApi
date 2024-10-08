import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class CreateCorsDto{
    @Type()
    @ApiProperty()
    @IsString()
    @IsOptional()
    logo:string

    @Type()
    @ApiProperty()
    @IsString()
    @IsOptional()
    sitename:string

    @Type()
    @ApiProperty()
    @IsString()
    @IsOptional()
    aboutus:string

    @Type()
    @ApiProperty()
    @IsString()
    @IsOptional()
    address:string


    @Type()
    @ApiProperty()
    @IsString()
    @IsOptional()
    phoneNumber:string

    @Type()
    @ApiProperty()
    @IsString()
    @IsOptional()
    email:string

    @Type()
    @ApiProperty()
    @IsString()
    @IsOptional()
    weekdayHours:string

    @Type()
    @ApiProperty()
    @IsString()
    @IsOptional()
    saturdayHours:string

    


}