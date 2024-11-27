import {
  ConflictException,
  HttpException,
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
import { CarriyingBalance } from './dto/carriying.balance.dto';
import { orderBalanceDto } from './dto/order.balance.dto';
import { UserRole } from 'src/shared/enum/user.enum';
import { updateUser } from './dto/updateUserAdmin.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private cls: ClsService,
  ) {}

  async find(params: FindUserParams<UserEntity>) {
    const { where, select, relations } = params;
    return await this.userRepo.find({ where, select, relations });
  }

  async findOne(params: FindUserParams<UserEntity>) {
    const { where, select, relations } = params;
    return await this.userRepo.findOne({ where, select, relations });
  }

  async userProfile(){
    const myUser = await this.cls.get<UserEntity>("user")
    const user = await this.findOne({where:{id:myUser.id},select:SELECTUSERFIELD})
    if(!user) throw new NotFoundException()
    if(myUser.role.includes(UserRole.ADMIN)){
      return this.find({select:SELECTUSERFIELD})

    }
    return user
  }

  async create(body: CreateUserDto) {
    const myuser = await this.cls.get<UserEntity>('user');
    const checkEmail = await this.findOne({ where: { email: body.email } });
    
    if (checkEmail) {
      throw new ConflictException('Email address already exists');
    }
    const finCode = await this.findOne({
      where: { finnishcode: body.finnishcode },
    });
    if (finCode)
      throw new ConflictException('The ID card FIN you entered is in use!');
    const serialNo = await this.findOne({
      where: { svSerialNo: body.svSerialNo },
    });
    if (serialNo)
      throw new ConflictException(
        'The ID card serial number you entered is in use!',
      );
    const phone = await this.findOne({ where: { phone: body.phone } });
    if (phone)
      throw new ConflictException(
        'TThe phone number you entered is already in use!',
      );
    if (body.password !== body.repeatPassword) {
      throw new ConflictException('Password is not match');
    }
    if(body.agreement !== true){
      throw new ConflictException(
        'Please click the  agreement button '
      )
    }
    const generateCustomerCode = ():number =>{
      return ( Math.floor(1000000 + Math.random() * 900000))
  
    }
    const customerCodes = generateCustomerCode()
    const user = this.userRepo.create(body);
    user.customerCode = customerCodes
    await user.save();
    delete user.repeatPassword;
    return  user
     
  }

  async update(id: number, body: Partial<UserEntity>) {
    
    return this.userRepo.update(id, body);
  }

  async updateMyProfile(body: UpdateProfileDto) {
    const myUser = await this.cls.get<UserEntity>('user');
    if (!myUser) throw new NotFoundException();
    await this.userRepo.update(myUser.id,body);
    return {
      status: true,
      message: 'profil updated',
    };
  }

  async updateUser(id:number,body:updateUser){
    const user = await this.userRepo.findOne({where:{id:id}})
    if(!user){
      throw new NotFoundException(`Not found user with ${id}`)
    }
    for(let i in body){
      user[i] = body[i]
    }
    await user.save()
    return user
  }

  async updateBalance(id:number,amount:number){
    const user = await this.userRepo.findOne({where:{id:id}})
    if(!user) throw new NotFoundException("not found user")
    user.orderBalance += amount
    await this.userRepo.save(user)
  }

  async deleteProfile(id: number) {
    const user = await this.findOne({ where: { id } });
    if (!user) throw new NotFoundException('not found user');
    await this.userRepo.delete(id);
    return {
      status: true,
      message: { message: 'user deleted successfully' },
    };
  }
  async increasesBalance(body: CarriyingBalance) {
    const myUser = await this.cls.get<UserEntity>('user');
    const user = await this.findOne({ where: { id: myUser.id } });
    if (!user) throw new NotFoundException('not found user');

    user.shippingBalance += Number(body.shippingBalance);
    await this.userRepo.save(user);
    return {
      shippingBalance: user.shippingBalance.toFixed(2),
    };
  }
  async orderBalance(body: orderBalanceDto) {
    const myUser = await this.cls.get<UserEntity>('user');
    const user = await this.findOne({ where: { id: myUser.id } });
    if (!user) throw new NotFoundException('not found user');
    console.log('Received orderBalance from body:', user.orderBalance);

    if (isNaN(user.orderBalance) || user.orderBalance === null || user.orderBalance === undefined) {
      user.orderBalance = 0;
      console.log('fjdhk');
    }
    
    user.orderBalance += Number(body.orderBalance);
    await this.userRepo.save(user);
    return {
      orderBalance: user.orderBalance.toFixed(2),
    };
  }
}
