import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { AuthGuard } from "src/guard/auth.guard";
import { ClsService } from "nestjs-cls";
import { UserEntity } from "src/database/entity/User.entity";
import {  UpdateProfileDto } from "./dto/updateProfile.dto";
import { Roles } from "src/shared/decorators/role.decorators";
import { UserRole } from "src/shared/enum/user.enum";
import { CarriyingBalance } from "./dto/carriying.balance.dto";
import { orderBalanceDto } from "./dto/order.balance.dto";
import { updateUser } from "./dto/updateUserAdmin.dto";

@Controller('user')


@ApiTags('User')
export class UserController{
    constructor(private userService:UserService,private cls:ClsService){}
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get("profile")
    async userProfile(){
        return this.userService.userProfile()

    }
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put("profile")
    updateMyProfile(@Body() body:UpdateProfileDto){
        return this.userService.updateMyProfile(body)
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Roles(UserRole.SUPER_ADMIN,UserRole.ADMIN)
    @Put("admin/:id")
    updateUser(@Param("id") id:number,@Body() body:updateUser){
        return this.userService.updateUser(id,body)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Roles(UserRole.ADMIN,UserRole.SUPER_ADMIN)
    @Delete("admin/:id")
    deleteProfile(@Param('id') id:number){
        return this.userService.deleteProfile(id)

    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('balance')
    increasesBalance(@Body() body:CarriyingBalance){
        return this.userService.increasesBalance(body)


    }
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('order-balance')
    orderBalance(@Body() body:orderBalanceDto){
        return this.userService.orderBalance(body)

    }

   
  

}