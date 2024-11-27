import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export  class updateUser{
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    customerCode:number;
    @ApiProperty()
    @IsOptional()
    @IsString()
    role:string;


}