import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TariffsEntity } from "src/database/entity/Tariffs.entity";
import { TariffsService } from "./tariffs.service";
import { TariffsController } from "./tariffs.controller";

@Module({
    imports: [TypeOrmModule.forFeature([TariffsEntity])],
    controllers: [TariffsController],
    providers: [TariffsService],
    exports: [TariffsService],
})
export class TariffsModule {}