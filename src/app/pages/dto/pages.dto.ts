import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class PagesDto{

    id:number
    title:string
    slug:string
}