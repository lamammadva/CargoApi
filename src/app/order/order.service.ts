import { BadRequestException, HttpException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/database/entity/Order.entity';
import { In, Repository } from 'typeorm';
import { createOrderDto } from './dto/create.order.dto';
import { ClsService } from 'nestjs-cls';
import { UserEntity } from 'src/database/entity/User.entity';
import { UserService } from '../user/user.service';
import { SELECTMYORDERS} from './order.types';
import { v4 as uuidv4 } from 'uuid';
import { FindUserParams } from 'src/shared/types/find.types';
import { PuppeteerService } from '../../puppeteer/service';
import { format } from 'date-fns';
import { PackageEntity } from 'src/database/entity/Package.entity';
import { TariffsEntity } from 'src/database/entity/Tariffs.entity';
import { TariffsService } from '../tariffs/tariffs.service';
import { CargoStatus, PaymentStatus } from 'src/shared/enum/order.enum';
import { updateOrderDto } from './dto/updateOrder.dto';
import { PackageService } from '../package/package.service';
import { shippingBalancePaymentDto } from './dto/shippingBalancePayment.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { UserRole } from 'src/shared/enum/user.enum';
import { SELECTUSERFIELD } from '../user/user.types';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity) private orderRepo: Repository<OrderEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @Inject(forwardRef(() => PackageService))
    private packageService:PackageService,
    private cls: ClsService,   
    private puppeteerService: PuppeteerService,
    private userService:UserService
  ) {}
  async find(params:FindUserParams<OrderEntity>){
    let { where, select, relations } = params;
    return await this.orderRepo.find({ where, select, relations });


  }
  async findOne(params: FindUserParams<OrderEntity>) {
    let { where, select, relations } = params;
    return await this.orderRepo.findOne({ where, select, relations });
  }
  async myOrders() {
    const myUser = await this.cls.get<UserEntity>('user');
    if (!myUser) throw new NotFoundException('User not found');
    const orders = await this.orderRepo.find({
      where: { user: { id: myUser.id } },
      select: SELECTMYORDERS,
      relations:['user']
    });
    console.log(myUser.role);
    if(myUser.role.includes(UserRole.ADMIN || UserRole.SUPER_ADMIN)){
      return await this.orderRepo.find({select:SELECTMYORDERS,relations:['user']})
    } 
    const orderData = orders.map((order )=>({
      ...order,
      createdAt:format(new Date(order.createdAt),'yyyy-MM-dd HH:mm'),
    }))
    return {
      orders:orderData,
    };
  }
  async getOrder(id:number){
    const myUser = await this.cls.get<UserEntity>("user")
    if(!myUser){
      throw new NotFoundException("not found user")
    }
    if(myUser.role.includes(UserRole.ADMIN || UserRole.SUPER_ADMIN)){
      const order =  await this.findOne({where:{id:id},select:SELECTMYORDERS,relations:['user']})
      if(!order) throw new NotFoundException("not found order")
      return order
    }else{
      const order = await this.findOne({where:{id:id,user:{id:myUser.id}},select:SELECTMYORDERS,relations:['user']})
      if(!order){
        throw new NotFoundException("not found order")
      }
      return order
      
    }
  }
 
  
  async updateOrder(id:number,body:updateOrderDto){
    const order = await this.orderRepo.findOne({where:{id:id},relations:['user']})
    if(!order){throw new NotFoundException(`Not found with ${id} order`)}
    await  this.orderRepo.update(id,body)
    if (body.status === 'rejected'){
      this.rejectOrder(order.user.id,order.amount)
    }
    if(body.status === CargoStatus.TEHVIL_VERILIB){
      await this.packageService.createPackage(id)
    }
   

    return {
      message:"update order successfully",
      status:true
    }
  }

  async shippingBalancePay(id:number){
    const myUser = await this.cls.get<UserEntity>('user')
    const order = await this.orderRepo.findOne({where:{id:id}})
    if(!order){throw new NotFoundException(`Not found with ${id} order`)}
    if(order.paymentStatus === PaymentStatus.PAID){throw new HttpException("the debt is paid",400)}
    if(myUser.orderBalance < order.deliveryPrice){throw new HttpException("Insufficient balance",400)}
    myUser.orderBalance -= order.deliveryPrice
    order.paymentStatus = PaymentStatus.PAID
    await this.orderRepo.save(order)
    await myUser.save()
    
    return{
      message:"Payment successful",
      status:true
    }
  }

  async createOrder(body: createOrderDto) {
    const myUser = await this.cls.get<UserEntity>('user');
    if (!myUser) throw new Error('User not found');
    const productDetails = await this.puppeteerService.getProductDetails(body.link);
    if (!productDetails.name) {
      throw new NotFoundException('Product details could not be retrieved from the link');
    }
    if(body.agreement !== true){
      throw new HttpException("please  accept the rules",400)
    }
    const generateOrderNo = (): number => {
      return Math.floor(100000000 + Math.random() * 900000000);
    };
    const orderNo = generateOrderNo();
    if (myUser.orderBalance < productDetails.price) {
      throw new NotFoundException('Insufficcient balance');
    }
    const total = (body.count *  productDetails.price * 7) / 100 
    const totalAmount = Number((body.count * productDetails.price) + total);
    if (isNaN(totalAmount)) {
      throw new BadRequestException('Total amount calculation failed');
    }
    myUser.orderBalance -= totalAmount;
    await this.userRepo.save(myUser);
    const order = await this.orderRepo.create({
      ...body,
      user: myUser,
      orderNo: orderNo,
      commission_price:total,
      amount: totalAmount,
      productName: productDetails.name,
      price: productDetails.price,
      imageUrl: productDetails.image,
      store:productDetails.store

    });
    await this.orderRepo.save(order);
    return {
      message: 'Order created successfully',
      order,
      
    };
  }
  async rejectOrder(userId:number,amount:number){
    await this.userService.updateBalance(userId,amount)

  }
  async deleteOrder(id:number){
    const order = await this.orderRepo.findOne({where:{id:id}})
    if(!order){throw new NotFoundException(`Not found with ${id} order`)}

    await this.orderRepo.delete(id)
    return {
      message:"successfully"
    }

  }
}
