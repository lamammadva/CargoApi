import { Module } from "@nestjs/common";
import { CorsService } from "./cors.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CorsConroller } from "./cors.controller";
import { CorsEntity } from "src/database/entity/Cors.entity";

@Module({
    imports:[TypeOrmModule.forFeature([CorsEntity])],
    controllers:[CorsConroller],
    providers:[CorsService],
    exports:[CorsService],
})

export class CorsModule{}
