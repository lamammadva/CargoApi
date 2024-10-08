import { ApiProperty, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { UserEntity } from "src/database/entity/User.entity";

export class ChangePasswordDto {
    @Type()
    @ApiProperty()
    old_password:string

    @Type()
    @ApiProperty()
    new_password:string

    @Type()
    @ApiProperty()
    repeatPassword:string





}