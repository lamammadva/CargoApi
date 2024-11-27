import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PackageEntity } from "src/database/entity/Package.entity";
import { PackageController } from "./package.controller";
import { PackageService } from "./package.service";
import { TariffsModule } from "../tariffs/tariffs.module";
import { OrderModule } from "../order/order.module";

@Module({
    imports: [TypeOrmModule.forFeature([PackageEntity]),TariffsModule,forwardRef(() => OrderModule)],
    controllers: [PackageController],
    providers: [PackageService],
    exports: [PackageService],
})
export class PackageModule{}