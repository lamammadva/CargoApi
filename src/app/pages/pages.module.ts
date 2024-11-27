import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PageEntity } from "src/database/entity/Page.entity";
import { PageController } from "./pages.controller";
import { PageService } from "./pages.service";

@Module({
    imports: [TypeOrmModule.forFeature([PageEntity])],
    controllers: [PageController],
    providers: [PageService],
    exports: [PageService]
})

export class PageModule {}