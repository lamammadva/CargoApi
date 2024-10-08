import { Body, Controller, Get, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CorsService } from "./cors.service";
import { CreateCorsDto } from "./dto/create.cors.dto";

@Controller("cors")
@ApiTags('Cors')
export class CorsConroller{
    constructor(private corsService:CorsService){
        
    }
    @Post()
    createCors(@Body() body:CreateCorsDto){
        return this.corsService.createCors(body)
    }
    @Get()
    getCors(){
        return this.corsService.find({})
    }
    @Put(":id")
    updateCors(){
        
    }
}