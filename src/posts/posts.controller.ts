import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import {PostsService} from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/all')
  async getAll() {
    return this.postsService.getAll();
  }

  @Post('/create')
  async create(@Body() dto: PostDto) {
    return this.postsService.create(dto);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findById(id);
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deleteById(id);
  }

  @Put(':id')
  async updateById(@Param('id', ParseIntPipe) id: number, @Body() dto: PostDto) {
    return this.postsService.updateById(id, dto);
  }
}
