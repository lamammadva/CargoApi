import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { MailerService } from '@nestjs-modules/mailer';
import * as dateFns from 'date-fns';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { ClsService } from 'nestjs-cls';
import { UserEntity } from 'src/database/entity/User.entity';
import { ForgetPasswordDto } from './dto/ForgetPassword.dto';
import * as crypto from 'crypto'
import config from 'src/config';
import { ResetPasswordDto } from './dto/resetPassword.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private mailerService: MailerService,
    private jwtService: JwtService,
    private cls: ClsService,
  ) {}
  async register(body: RegisterDto) {
    const user = await this.userService.create(body);
    this.mailerService.sendMail({
      to: user.email,
      from: 'lamanb.memmedova@gmail.com',
      subject: 'Registration for the 166kargo.az site ',
      text: 'Welcome Registration for the 166cargo.az site has been completed successfully',
      html: `<b>Welcome ${user.fullName}</b><br><p>Registration for the 166cargo.az site has been completed successfully</p>`,
    });

    return user;
  }
  async login(body: LoginDto) {
    const user = await this.userService.findOne({
      where: [{ email: body.email }],
    });
    if (!user) {
      throw new HttpException('Email is wrong', HttpStatus.BAD_REQUEST);
    }
    const password = await bcrypt.compare(body.password, user.password);
    console.log(password);

    if (!password) {
      throw new HttpException('Passowrd is wrong ', HttpStatus.BAD_REQUEST);
    }
    let payload = {
      userId: user.id,
    };

    const token = this.jwtService.sign(payload);
    return {
      token,
      user,
    };
  }

  async changePassword(body: ChangePasswordDto) {
    const myUser = await this.cls.get<UserEntity>('user');

    if (!myUser) throw new NotFoundException('not found user');
    const old_password = await bcrypt.compare(
      body.old_password,
      myUser.password,
    );
    console.log(old_password);

    if (!old_password)
      throw new HttpException('old password is wrong', HttpStatus.BAD_REQUEST);

    if (body.new_password !== body.repeatPassword)
      throw new HttpException(
        'new passwords is not match',
        HttpStatus.BAD_REQUEST,
      );
    const new_password = await bcrypt.hash(body.new_password, 10);
    const password = await this.userService.update(myUser.id, {
      password: new_password,
    });
    return {
      status: true,
      message: 'password has been changed',
    };
  }

  async forgetPassword(body: ForgetPasswordDto) {
    const myUser = await this.cls.get<UserEntity>('user');
    if (!myUser) throw new NotFoundException();
    const user = await this.userService.findOne({
      where: { email: body.email },
      
    });
    if(!user) throw new NotFoundException("Not found email address")
    const activateToken = crypto.randomBytes(12).toString('hex')
    const activateExpire =  dateFns.addMinutes(new Date(),30)
    await this.userService.update(user.id,{activateToken,activateExpire})
    this.mailerService.sendMail({
      to: user.email,
      from: 'lamanb.memmedova@gmail.com',
      subject: 'Password Reset Notification for 166kargo.az',
      text: `Hello ${user.fullName}, Please click the link below to reset your password for the 166kargo.az site: ${config.url}/auth/forget_password?token=${activateToken}&email=${user.email}`,
      html: `<p>Hello <b>${user.fullName}</b>,</p>
             <p>Please click the link below to reset your password for the <a href="https://166karqo.az/"> 166kargo.az</a>site:</p>
             <a href="${config.url}/auth/forget-password?token=${activateToken}&email=${user.email}">Reset Password</a>
             <p>Best regards, The <a href="https://166karqo.az/"> Team</p>`
    });
    return {
      status:true,
      token:activateToken,
      message:{message:`sent message to ${user.email}`}
    }

  }
  async resetPassword(body:ResetPasswordDto){
    const user = await this.userService.findOne({where:{email:body.email}})
    if(!user) throw new NotFoundException("Not found email address")
    if(user.activateToken !== body.token) throw new HttpException("token is wrong",HttpStatus.BAD_REQUEST)
    if(body.new_password !== body.confirm_password){
      throw new HttpException("passwords is not match",HttpStatus.BAD_REQUEST)
    }
    if(user.activateExpire < new  Date())throw new HttpException("token is expire",400)
    const password = bcrypt.hashSync(body.new_password,10)

    const newPassword = await this.userService.update(user.id,{password:password,activateToken: null,
      activateExpire: null,})
    return {
      status:true,
      message:{message:"reset password succesfully"}
    }


  }

}
