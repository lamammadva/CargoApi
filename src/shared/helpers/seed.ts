import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { UserSeed } from "src/database/seed/seed";
import { DataSource } from "typeorm";

export  async function RunSeed(){
    const app = await NestFactory.create(AppModule)
    const dataSource = app.get(DataSource)
    await UserSeed(dataSource)

    
}
RunSeed()