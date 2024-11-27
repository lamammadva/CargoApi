import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PageEntity } from "src/database/entity/Page.entity";
import { Repository } from "typeorm";
import { CreatePageDto } from "./dto/create.page.dto";
import { FindUserParams } from "src/shared/types/find.types";
import { PagesDto } from "./dto/pages.dto";

@Injectable()
export class PageService{
    constructor(@InjectRepository(PageEntity) private pageRepo:Repository<PageEntity>){
    }
    find(param:FindUserParams<PageEntity>): Promise<PageEntity[]>{
        let {where,select,relations} = param
        return this.pageRepo.find({where,select,relations})
    }
    findOne(param:FindUserParams<PageEntity>){
        let {where,select,relations} = param
        return this.pageRepo.findOne({where,select,relations})
    }
    async pages(): Promise<PagesDto[]>{
        const pages = await this.pageRepo.find();
        return pages.map(page => ({
            id:page.id,
            title: page.title,
            slug: page.slug,
        }));
    }
    async pagesSlug(slug:string){
        const data = await this.pageRepo.findOne({where:{slug}})
        if (!data) {
            throw new Error('Page not found');
          }
        return data
          
        
    }
    async createPage(body:CreatePageDto){
        const page =  this.pageRepo.create(body)
        await page.save()
        return page
    }
}