import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from 'src/database/entity/News.entity';
import { Repository } from 'typeorm';
import { createNewsDto } from './dto/createNews.dto';
import { ImageEntity } from 'src/database/entity/Image.entity';
import { NotFoundError } from 'rxjs';
import { FindUserParams } from 'src/shared/types/find.types';
import { SELECTFINDNEWS, SELECTFINDONENEWS } from './news.type';
import { updateNewsDto } from './dto/updateNews.dto';
import { RedisService } from 'src/shared/libs/redis/redis.service';

@Injectable()
export class NewsService {
  constructor(
    private redisService:RedisService,
    @InjectRepository(NewsEntity) private newsRepo: Repository<NewsEntity>,
    @InjectRepository(ImageEntity) private uploadRepo: Repository<ImageEntity>,
  ) {}
  async find(params: FindUserParams<NewsEntity>) {
    const { where, select, relations } = params;
    return this.newsRepo.find({ where, select, relations });
  }
  async findOne(params: FindUserParams<NewsEntity>) {
    const { where, select, relations } = params;
    return this.newsRepo.findOne({ where, select, relations });
  }
  async getNews() {
    const chachData = await this.redisService.get('news_data')
    if(chachData){
      console.log('data chachdan gelir');
      return JSON.parse(chachData)
      
    }
    const news = await  this.find({select:SELECTFINDNEWS,relations:['image']});
    await this.redisService.set('news_data',JSON.stringify(news))
    return news

  }
  async getNewsById(id:number){
    const news = await this.newsRepo.findOne({where:{id:id},select:SELECTFINDONENEWS,relations:['image']})
    if(!news) throw new NotFoundException(`Not found news with ${id}`)
    return news
  }

  async createNews(body: createNewsDto) {
    const { title, description, imageId } = body;
    const images = await this.uploadRepo.findOne({ where: { id: imageId } });
    if (!images) throw new NotFoundException();
    const chachData = await this.redisService.get("news_data")
    if(chachData){
      await this.redisService.del('news_data')
      
    }
    const news = await this.newsRepo.create({
      title,
      description,
      image: images,
    });
    await news.save();
    return news;
  }

  async deleteNews(id:number){
    const news = await this.newsRepo.delete({id})
    const chachData = await this.redisService.get("news_data")
    if(chachData){
      await this.redisService.del('news_data')
      
    }
    return {
      message:"successfully"
    }

  }

  async updateNews(id:number,body:updateNewsDto){
    const {title,description,imageId} = body;
    
    const news = await this.newsRepo.findOne({where:{id:id},relations:['image']})
    const chachData = await this.redisService.get("news_data")
    if(chachData){
      await this.redisService.del('news_data')
      
    }
    if(!news )throw new NotFoundException()
    for(let key in body){
      if(key === "imageId"){
        news.image = await this.uploadRepo.findOne({where:{id:imageId}})
      }
      else{
        news[key] = body[key]
      }
    }
    await  news.save()
    return news
    
    

  } 
}
