import { HttpException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClsService } from 'nestjs-cls';
import { PackageEntity } from 'src/database/entity/Package.entity';
import { UserEntity } from 'src/database/entity/User.entity';
import { Repository } from 'typeorm';
import { SELECTMYPACKAGES, SELECTMYPACKAGESUPDATE } from './package.types';
import { updatePackageDto } from './dto/updatePackages.dto';
import { TariffsService } from '../tariffs/tariffs.service';
import { carryingBalancePayment } from './dto/carryingBalancePay.dto';
import { CargoStatus, PaymentStatus } from 'src/shared/enum/order.enum';
import { OrderService } from '../order/order.service';
import { UserRole } from 'src/shared/enum/user.enum';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(PackageEntity)
    private packageRepo: Repository<PackageEntity>,
    private cls: ClsService,
    @Inject(forwardRef(() => OrderService))
    private orderService:OrderService,
    private tariffsService:TariffsService,

  ) {}

  async weightPackage(
    width: number,
    height: number,
    depth: number,
  ) {
    const size = Number(width * height * depth) / 6000;
    return size;
  }
  async getPackage() {
    const myUser = await this.cls.get<UserEntity>('user');
    if (!myUser) throw new NotFoundException('User not found');
    const packages = await this.packageRepo.find({
      where: { order: { user: { id: myUser.id } } },
      select: SELECTMYPACKAGES,
      relations: ['order'],
    });
    if(myUser.role.includes(UserRole.ADMIN)){
      return await this.packageRepo.find({select:SELECTMYPACKAGES})
    }
    return { packages };
  }
  async updatePackageWeight(id:number,body: updatePackageDto) {
    const {width, height, depth, country, status } = body;
    const packages = await this.packageRepo.findOne({
      where: { id: id },
      select: SELECTMYPACKAGESUPDATE,
    })
    const tariffs = await this.tariffsService.find({
      where: { countyName: country },
    })
    if (!packages) {
      throw new NotFoundException('Package not found');
    }
   
   
    if(status === CargoStatus.GONDERILIB){
      
      const weightPackage = await this.weightPackage(
        width,
        height,
        depth,
      );
      const matchTariff = tariffs.find(
        (tarif) =>
          tarif.countyName === country &&
          tarif.minWeight <= weightPackage &&
          weightPackage <= tarif.maxWeight,
      );
      if (!matchTariff) {
        throw new NotFoundException('Matching tariff not found for the given criteria');
      }
      const totalPrice = weightPackage * matchTariff.convertedPrice;
      packages.weight = weightPackage;
      packages.totalprice = totalPrice;
      packages.height = height;
      packages.width = width;
      packages.depth = depth;      
    }
    packages.status = status;   
    await this.packageRepo.save(packages);

    return {
      status: true,
      message: 'package successfully updated',
    };
  }


  async createPackage(id:number){
    const order = await this.orderService.findOne({where:{id:id}})
    console.log(order);
    
    function generateTrackingNumber(): string {
      return Math.random().toString(36).substring(2, 10).toUpperCase();
    }
    const packages = await this.packageRepo.create({
      trackingNumber:generateTrackingNumber(),
      order:order,
      status:CargoStatus.XARICI_ANBARA_GONDERILIB
   
    })
    await this.packageRepo.save(packages)
    return packages
  }
  
  async carryingBalancePay(body: carryingBalancePayment) {
    const myUser = await this.cls.get<UserEntity>('user');
    if (!myUser) throw new Error('User not found');
    const userPackage = await this.packageRepo.find({
      where: { order: { user: { id: myUser.id } } },
    });


    const userPackageId = userPackage.map((pk) => pk.id);
    
    
    const packagesElement = body.packageId.filter(
      (id) => !userPackageId.includes(id),
    );
    if (packagesElement.length > 0) {
      throw new Error(
        `Package(s) with ID(s) ${packagesElement.join(', ')} not found for this user.`,
      );
    }

    let totalPrice = 0;
    userPackage.forEach((pk) => {
      if (pk.totalprice !== null) {
        if (body.packageId.includes(pk.id)) {
          if (myUser.orderBalance < totalPrice) {
            throw new Error('Insufficient balance to complete payment.');
          }
          totalPrice += pk.totalprice;
        }
      }
    });
    const payment = myUser.orderBalance - totalPrice;
    myUser.orderBalance = payment;
    await Promise.all(
      userPackage.map(async (pk) => {
        if (body.packageId.includes(pk.id)) {
          pk.paymentStatus = PaymentStatus.PAID;
          await this.packageRepo.save(pk);
        }
        if(pk.paymentStatus === "paid"){
          throw new HttpException("package paid",400)
        }
      }),
    );
    await myUser.save()
    return {
      message:"payment successfully"
    };
  }
}
