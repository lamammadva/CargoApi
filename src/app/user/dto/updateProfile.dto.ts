import { OmitType } from "@nestjs/swagger";
import { CreateUserDto } from "./create.user.dto";

export class UpdateProfileDto extends OmitType( CreateUserDto,['password','repeatPassword','agreement'] as const){

}