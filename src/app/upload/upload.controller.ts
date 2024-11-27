import { Controller, Delete, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { AuthGuard } from "src/guard/auth.guard";
import { Roles } from "src/shared/decorators/role.decorators";
import { UserRole } from "src/shared/enum/user.enum";

@Controller('admin/uploads')
@ApiTags('Uploads')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UploadController{
    constructor(private uploadService: UploadService){}
    @Roles(UserRole.ADMIN || UserRole.SUPER_ADMIN)
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      required: true,
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
    uploadImage(
      @Req() req: Request,
  
      @UploadedFile(
        new ParseFilePipe({
          validators: [
            new MaxFileSizeValidator({ maxSize: 10485760 }),
            new FileTypeValidator({
              fileType: /image\/(jpg|jpeg|png|webp)$/i,
            }),
          ],
        }),
      )
      file: Express.Multer.File,
    ){
      return this.uploadService.uploadImage(req, file);
    }
    @Delete(":id")
    deleteImage(@Param('id') id:number){
      return this.uploadService.deleteImage(id)
    }
}