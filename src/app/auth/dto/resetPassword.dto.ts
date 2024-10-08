import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsEmail, IsString, Length } from "class-validator"

export class ResetPasswordDto{
    @Type()
    @ApiProperty()
    @IsString()
    new_password:string
    @Type()
    @ApiProperty()
    @IsString()
    confirm_password:string
    @Type()
    @ApiProperty()
    @IsString()
    @Length(10)
    token:string
    @Type()
    @ApiProperty()
    @IsEmail()
    email:string
    
}