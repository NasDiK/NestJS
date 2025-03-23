import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {type ValueOf} from '../utils/utilityTypes';
import {service} from '../enums/core';
import {Users} from './User.entity';

@Entity()
export class UsersRights {
  @Column({primary: true, type: 'integer'})
  userId: number;

  @Column({type: 'smallint', nullable: false})
  service: ValueOf<typeof service>;

  @Column({type: 'integer', nullable: false})
  rights: number;

  @ManyToOne(type => Users, usr => usr.id, {cascade: true})
  @JoinTable()
  user: Users
}