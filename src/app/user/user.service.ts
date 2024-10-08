import {
  ConflictException,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entity/User.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { FindUserParams } from 'src/shared/types/find.types';
import { SELECTUSERFIELD } from './user.types';
import { AuthGuard } from 'src/guard/auth.guard';
import { ClsService } from 'nestjs-cls';
import { UpdateProfileDto } from './dto/updateProfile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,private cls:ClsService,
  ) {}

  async find(params: FindUserParams<UserEntity>) {
    const { where, select, relations } = params;
    return await this.userRepo.find({ where, select, relations });
  }
  async findOne(params: FindUserParams<UserEntity>) {
    const { where, select, relations } = params;
    return await this.userRepo.findOne({ where, select, relations });
  }

  
  async create(body: CreateUserDto) {
    const myuser = await this.cls.get<UserEntity>('user') 
    console.log(myuser);
    const checkEmail = await this.findOne({ where: { email: body.email } });
    if (checkEmail) {
      throw new ConflictException('Email address already exists');
    }
    const finCode = await this.findOne({where:{finnishcode:body.finnishcode}})
    if(finCode) throw new ConflictException("The ID card FIN you entered is in use!")
    const serialNo = await this.findOne({where:{svSerialNo:body.svSerialNo}})
    if(serialNo) throw new ConflictException("The ID card serial number you entered is in use!")
    const phone = await this.findOne({where:{phone:body.phone}})
    if(phone) throw new ConflictException("TThe phone number you entered is already in use!")
    if (body.password !== body.repeatPassword) {
      throw new ConflictException('Password is not match');
    }
    const user = this.userRepo.create(body);

    await user.save();
    delete user.repeatPassword;
    return user;
  }
  async update(id:number, body:Partial<UserEntity>){
    return this.userRepo.update(id,body)
  }
  async updateProfile(body:UpdateProfileDto){
    const myUser = await this.cls.get<UserEntity>('user')
    if(!myUser) throw new NotFoundException()
    const updateUserId = {
     ...myUser,
     ...body
    
    }
    await  this.userRepo.update(myUser.id,updateUserId)
    return {
      status:true,
      message:'profil updated'
    }

  }
}
