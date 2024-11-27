import { Module } from "@nestjs/common";
import { NewsController } from "./news.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NewsEntity } from "src/database/entity/News.entity";
import { NewsService } from "./news.service";
import { ImageEntity } from "src/database/entity/Image.entity";

@Module({
    imports: [TypeOrmModule.forFeature([NewsEntity,ImageEntity])],
    controllers: [NewsController],
    providers: [NewsService],
    exports: [],
})
export class NewsModule{}