import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { createNewsDto } from './dto/createNews.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/shared/decorators/role.decorators';
import { UserRole } from 'src/shared/enum/user.enum';
import { updateNewsDto } from './dto/updateNews.dto';

@Controller()
@ApiTags('News')
export class NewsController {
  constructor(public newsService: NewsService) {}

  @Get("news")
  getNews() {
    return this.newsService.getNews();
  }
  @Get('news/:id')
  getNewsById(@Param('id') id: number) {
    return this.newsService.getNewsById(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN || UserRole.SUPER_ADMIN)
  @Post("admin/news")
  createNews(@Body() body: createNewsDto) {
    return this.newsService.createNews(body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN || UserRole.SUPER_ADMIN)
  @Delete('admin/news/:id')
  deleteNews(@Param('id') id:number){
    return this.newsService.deleteNews(id)
  }


  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN || UserRole.SUPER_ADMIN)
  @Put('admin/news/:id')
  updateNews(@Param('id') id:number,@Body() body:updateNewsDto){
    return this.newsService.updateNews(id,body)
  }


}
