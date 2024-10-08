import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CorsEntity } from "src/database/entity/Cors.entity";
import { FindUserParams } from "src/shared/types/find.types";
import { Repository } from "typeorm";
import { CreateCorsDto } from "./dto/create.cors.dto";

@Injectable()
export class CorsService{
    constructor(@InjectRepository(CorsEntity) private corsRepo:Repository<CorsEntity>){

    }
    find(params:FindUserParams<CorsEntity>){
        let {where,select,relations} = params
        return this.corsRepo.find({where,select,relations})

    }
    findOne(params:FindUserParams<CorsEntity>){
        let {where,select,relations} = params
        return this.corsRepo.findOne({where,select,relations})


    }
    async createCors(body:CreateCorsDto){
        const data =  this.corsRepo.create(body)
        await data.save()
        return data
    }
    
}