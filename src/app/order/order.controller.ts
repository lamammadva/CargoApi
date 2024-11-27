import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { createOrderDto } from './dto/create.order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { carryingBalancePayment } from '../package/dto/carryingBalancePay.dto';
import { updateOrderDto } from './dto/updateOrder.dto';
import { shippingBalancePaymentDto } from './dto/shippingBalancePayment.dto';
import { UserRole } from 'src/shared/enum/user.enum';
import { Roles } from 'src/shared/decorators/role.decorators';

@Controller()
@ApiTags("Order")
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Roles(UserRole.ADMIN,UserRole.SUPER_ADMIN,UserRole.USER)
  @Get('orders')
  myOrders(){
    return this.orderService.myOrders();
  }
  @Roles(UserRole.ADMIN,UserRole.SUPER_ADMIN,UserRole.USER)
  @Get('orders/:id')
  getOrder(@Param('id') id: number) {
    return this.orderService.getOrder(id);
  }
  @Post('orders')
  createOrder(@Body() body: createOrderDto) {
    return this.orderService.createOrder(body);
  }
  @Roles(UserRole.ADMIN,UserRole.SUPER_ADMIN)
  @Put('admin/orders/:id')
  updateOrder(@Param('id') id:number , @Body() body:updateOrderDto){
    return this.orderService.updateOrder(id,body)
  }
  @Post('orders/:id/pay')
  shippingBalancePay(@Param('id') id:number){
    return this.orderService.shippingBalancePay(id)
    
  }
  @Roles(UserRole.ADMIN || UserRole.SUPER_ADMIN)
  @Delete('admin/order/:id')
  deleteOrder(@Param('id') id:number ){
    return this.orderService.deleteOrder(id)

  }
  

}
