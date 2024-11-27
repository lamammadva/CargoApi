import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class createNewsDto{
    @ApiProperty()
    @IsOptional()
    @IsString()
    title:string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description:string;


    @ApiProperty()
    @IsOptional()
    @IsNumber()
    imageId:number;
}