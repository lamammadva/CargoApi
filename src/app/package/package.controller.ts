import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PackageService } from './package.service';
import { carryingBalancePayment } from './dto/carryingBalancePay.dto';
import { updatePackageDto } from './dto/updatePackages.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { UserRole } from 'src/shared/enum/user.enum';
import { Roles } from 'src/shared/decorators/role.decorators';

@Controller()
@ApiTags("Package")
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class PackageController {
  constructor(private packageService: PackageService) {}
  @Get('package')
  getPackage() {
    return this.packageService.getPackage();
  }
  @Post('package/pay')
  carryingBalancePay(@Body() body: carryingBalancePayment) {
    return this.packageService.carryingBalancePay(body);
  }
  @Roles(UserRole.ADMIN || UserRole.SUPER_ADMIN)
  @Put('admin/package/:id')
  updatePackageWeight(@Param('id') id:number,@Body() body: updatePackageDto) {
    return this.packageService.updatePackageWeight(id,body);
  }
}
