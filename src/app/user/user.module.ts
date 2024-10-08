import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/database/entity/User.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
@Global()
@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers:[UserController],
    providers:[UserService],
    exports:[UserService]
})

export class UserModule{}