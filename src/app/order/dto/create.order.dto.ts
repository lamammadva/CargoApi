import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { OrderEntity } from "src/database/entity/Order.entity";

export class createOrderDto extends PickType(OrderEntity,['link','color','note','price','size','count']){

    @ApiProperty()
    @IsString()
    link: string;
    @ApiProperty()
    @IsString()
    color: string;
    @IsOptional()
    @ApiProperty({required: false})
    @IsString()
    note: string;
    @IsOptional()
    @ApiProperty({required: false})
    @IsString()
    size: string;
    @ApiProperty()
    @IsNumber()
    count: number;
    @ApiProperty()
    @IsBoolean()
    agreement: boolean;
    
    
}