import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {pgConfig} from '../config/'
import {Users} from './entities/User.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: pgConfig.connection.host,
    port: pgConfig.connection.port,
    database: pgConfig.connection.database,
    username: pgConfig.connection.user,
    password: pgConfig.connection.password,
    entities: [Users],
    migrations: [],
    migrationsTableName: "migrations_table"

  }),
  TypeOrmModule.forFeature([Users])
],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
