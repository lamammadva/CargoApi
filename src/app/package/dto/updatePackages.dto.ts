import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { CargoStatus } from "src/shared/enum/order.enum";

export class updatePackageDto{
    @IsOptional()
    @IsNumber()
    @ApiProperty()
    height:number;
    @IsOptional()
    @ApiProperty()
    @IsNumber()
    width:number;
    @IsOptional()
    @ApiProperty()
    @IsNumber()
    depth:number;
    @IsOptional()
    @ApiProperty()
    @IsString()
    country:string;
    @IsOptional()
    @ApiProperty()
    @IsEnum(CargoStatus)
    status:CargoStatus;
   

    @IsOptional()
    @ApiProperty()
    @IsString()
    paymentStatus:string

    
}