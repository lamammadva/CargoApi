import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { TariffsService } from "./tariffs.service";
import { CreateTariffsDto } from "./dto/create.tariffs.dto";
import { UpdateTariffDto } from "./dto/update.tariff.dto";
import { AuthGuard } from "src/guard/auth.guard";
import { Roles } from "src/shared/decorators/role.decorators";
import { UserRole } from "src/shared/enum/user.enum";

@Controller()
@ApiTags("Tariffs")
export class TariffsController {
    constructor(private tariffsService: TariffsService){
    }
    @Get('tariffs')
    tariffs(){
        return this.tariffsService.tariffs()

    }
    @Get("tariffs/:country")
    getTariffsByCountry(@Param('country') country:string){
        return this.tariffsService.getTariffsByCountry(country)

    }
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Roles(UserRole.ADMIN,UserRole.SUPER_ADMIN)
    @Post('admin/tariffs')
    createTariff(@Body() body:CreateTariffsDto){
        return this.tariffsService.createTariff(body)
    }
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Roles(UserRole.ADMIN,UserRole.SUPER_ADMIN)
    @Put("admin/tariffs/:id")
    updateTariff(@Param("id") id:number,@Body() body:UpdateTariffDto){
        return  this.tariffsService.updateTariff(id,body)
    }
    
}