import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CorsService } from './cors.service';
import { CreateCorsDto } from './dto/create.cors.dto';
import { UpdateCorsDto } from './dto/update.cors.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/shared/decorators/role.decorators';
import { UserRole } from 'src/shared/enum/user.enum';

@Controller()
@ApiTags('Cors')
export class CorsConroller {
  constructor(private corsService: CorsService) {}
  @Get('cors')
  getCors() {
    return this.corsService.find({});
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Post('admin/cors')
  craeteCors(@Body() body: UpdateCorsDto) {
    return this.corsService.createCors(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @Put('admin/cors:id')
  updateCors(@Param('id') id:number , @Body() body: UpdateCorsDto) {
    return this.corsService.updateCors(id,body);
  }
}
