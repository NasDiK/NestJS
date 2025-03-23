import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {PostDto} from './dto/post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {Users} from './entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  posts: any[];

  constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {
    // this.usersRepository.
    this.posts = [
      {id: 1, title: 'Заголовок 1'},
      {id: 2, title: 'Заголовок 2'}
    ];
  }

  async getAll() {
    return this.usersRepository.find();
  }

  async create(dto: PostDto) {
    return [...this.posts, dto];
  }

  async findById(id: number) {
    return this.posts.find(({id: postId}) => id === postId) ?? null
  }

  async deleteById(id: number) {
    const isExist = this.posts.findIndex((p) => p.id === id) !== -1;
     if (isExist) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Ok'
      };
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateById(id: number, body: PostDto) {
    const isExist = this.posts.findIndex((p) => p.id === id) !== -1;
     if (isExist) {
      const other = this.posts.filter((p) => p.id !== id);
      return [...other, {id, ...body}]
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
