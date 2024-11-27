import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class updateNewsDto{
    @ApiProperty()
    @IsString()
    @IsOptional()
    title:string;
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    description:string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    imageId:number;


}