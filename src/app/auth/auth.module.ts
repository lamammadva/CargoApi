import { Module } from "@nestjs/common";
import { UserEntity } from "src/database/entity/User.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";


@Module({
    imports:[UserEntity],
    controllers:[AuthController],
    providers:[AuthService],
    exports:[AuthService],
})
export class AuthModule{}