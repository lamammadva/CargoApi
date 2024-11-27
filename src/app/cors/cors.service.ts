import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindUserParams } from "src/shared/types/find.types";
import { Repository } from "typeorm";
import { CreateCorsDto } from "./dto/create.cors.dto";
import { UpdateCorsDto } from "./dto/update.cors.dto";
import { CorsEntity } from "src/database/entity/Cors.entity";

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
    async createCors(body: CreateCorsDto){
        const data = await this.corsRepo.create(body)
        await this.corsRepo.save(data)
        return {
            status:true,
            message:"created successfully"
        }
    }

    async updateCors(id:number,body:UpdateCorsDto){
        const data = await this.findOne({where:{id:id}})
        Object.assign(data,body)
        await this.corsRepo.save(data)
        return {
            status:true,
            message:"updated successfully"
        } 
    }

}