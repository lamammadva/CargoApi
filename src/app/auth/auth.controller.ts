import { Body, Controller, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { ChangePasswordDto } from "./dto/changePassword.dto";
import { AuthGuard } from "src/guard/auth.guard";
import { ForgetPasswordDto } from "./dto/ForgetPassword.dto";
import { ResetPasswordDto } from "./dto/resetPassword.dto";

@Controller('auth')
@ApiTags('Auth')
export class AuthController{
    constructor(private authService: AuthService){
        
    }
    @Post('register')
    register(@Body() body:RegisterDto){
        return this.authService.register(body)

    }
    @Post('login')
    login(@Body() body:LoginDto){
        return this.authService.login(body)

    }
    
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put('change-password')
    changePassword(@Body() body:ChangePasswordDto){
        return this.authService.changePassword(body)
    }
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('forget-password')
    forgetPassword(@Body() body:ForgetPasswordDto){
        return this.authService.forgetPassword(body)

    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('reset-password')
    resetPassword(@Body() body:ResetPasswordDto){
        return this.authService.resetPassword(body)

    }
}
