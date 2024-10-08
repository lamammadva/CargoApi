import { Body, Controller, Get, NotFoundException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { AuthGuard } from "src/guard/auth.guard";
import { ClsService } from "nestjs-cls";
import { UserEntity } from "src/database/entity/User.entity";
import {  UpdateProfileDto } from "./dto/updateProfile.dto";

@Controller('user')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('User')
export class UserController{
    constructor(private userService:UserService,private cls:ClsService){}

    @Get("profile")
    async myProfile(){
        const myUser = await this.cls.get<UserEntity>('user')
        if(!myUser) throw new NotFoundException()
        return this.userService.findOne({where:{id:myUser.id}})

    }
    @Put()
    updateProfile(@Body() body:UpdateProfileDto){
        return this.userService.updateProfile(body)
    }
   
  

}