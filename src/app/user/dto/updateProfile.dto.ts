import { ApiProperty, OmitType } from "@nestjs/swagger";
import { CreateUserDto } from "./create.user.dto";
import { IsNumber, IsOptional } from "class-validator";

export class UpdateProfileDto extends OmitType( CreateUserDto,['password','repeatPassword','agreement','role'] as const){
  
}