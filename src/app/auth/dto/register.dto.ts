import { OmitType } from "@nestjs/swagger";
import { CreateUserDto } from "src/app/user/dto/create.user.dto";
import { UserEntity } from "src/database/entity/User.entity";

export class  RegisterDto extends CreateUserDto{
    
}