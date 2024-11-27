import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { ImageEntity } from "src/database/entity/Image.entity";
import { Repository } from "typeorm";

@Injectable()
export class UploadService{
    constructor(@InjectRepository(ImageEntity) private uploadRepo:Repository<ImageEntity>){}

    async uploadImage(req: Request, file: Express.Multer.File) {
        let port = req.socket.localPort;
        let image = this.uploadRepo.create({
          filename: file.filename,
          url: `${req.protocol}://${req.hostname}${port ? `:${port}` : ''}/uploads/${file.filename}`,
        });
    
        await image.save();
        return image;
      }
    
      async deleteImage(id: number) {
        let image = await this.uploadRepo.findOne({ where: { id } });
        if (!image) throw new NotFoundException();
        return await image.remove();
      }
      async deleteImages(images: ImageEntity[]) {
        return await this.uploadRepo.remove(images);
      }
    }