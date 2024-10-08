import { Module } from "@nestjs/common";
import { CorsService } from "./cors.service";
import { CorsEntity } from "src/database/entity/Cors.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CorsConroller } from "./cors.controller";

@Module({
    imports:[TypeOrmModule.forFeature([CorsEntity])],
    controllers:[CorsConroller],
    providers:[CorsService],
    exports:[CorsService],
})

export class CorsModule{}
