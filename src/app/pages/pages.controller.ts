import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { PageService } from "./pages.service";
import { CreatePageDto } from "./dto/create.page.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PagesDto } from "./dto/pages.dto";
import { PageEntity } from "src/database/entity/Page.entity";
import { UserRole } from "src/shared/enum/user.enum";
import { AuthGuard } from "src/guard/auth.guard";
import { Roles } from "src/shared/decorators/role.decorators";

@Controller()
@ApiTags("Pages")
export class PageController{
    constructor(private pageService:PageService){

    }

    @Get('pages')
    async pages(): Promise<PagesDto[]>{
        return this.pageService.pages()
        
    }
    @Get("pages/:slug")
    async pagesSlug(@Param('slug') slug:string){
        return this.pageService.pagesSlug(slug)
        
    }
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Roles(UserRole.ADMIN,UserRole.SUPER_ADMIN)
    @Post('admin/pages')
    createPage(@Body() body:CreatePageDto){
        return this.pageService.createPage(body)
    }
}