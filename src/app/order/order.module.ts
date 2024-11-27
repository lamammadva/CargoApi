import { Module, forwardRef } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "src/database/entity/Order.entity";
import { UserModule } from "../user/user.module";
import { PuppeteerService } from "src/puppeteer/service";
import { PackageEntity } from "src/database/entity/Package.entity";
import { TariffsModule } from "../tariffs/tariffs.module";
import { PackageModule } from "../package/package.module";

@Module({
    imports:[TypeOrmModule.forFeature([OrderEntity]),UserModule,PackageModule],
    controllers: [OrderController],
    providers: [OrderService,PuppeteerService],
    exports: [OrderService],
})
export class OrderModule{}