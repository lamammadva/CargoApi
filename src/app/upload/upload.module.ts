import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImageEntity } from "src/database/entity/Image.entity";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";

@Module({
    imports:[TypeOrmModule.forFeature([ImageEntity]),
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../../../uploads'),
        filename: (req, file, callback) => {
          callback(
            null,
            `${Date.now()}${extname(file.originalname).toLowerCase()}`,
          );
        },
      }),
    }),
  ],
    providers:[UploadService],
    controllers:[UploadController],
})
export class UploadModule{

}