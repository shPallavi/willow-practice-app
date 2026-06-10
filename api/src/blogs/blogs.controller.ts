import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  getAllBlogs() {
    return this.blogsService.getAllBlogs();
  }

  @Get(':id')
  getBlogById(@Param('id') id: string) {
    return this.blogsService.getBlogById(Number(id));
  }

  @Post()
  createBlog(@Body() body: CreateBlogDto) {
    return this.blogsService.createBlog(body);
  }

  @Put(':id')
  updateBlog(@Param('id') id: string, @Body() body: UpdateBlogDto) {
    return this.blogsService.updateBlog(Number(id), body);
  }

  @Delete(':id')
  deleteBlog(@Param('id') id: string) {
    return this.blogsService.deleteBlog(Number(id));
  }
}
