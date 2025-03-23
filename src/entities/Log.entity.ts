import { Column, Entity, JoinTable, ManyToOne } from "typeorm";
import {type ValueOf} from '../utils/utilityTypes';
import {logLevel, logType} from '../enums/core';
import {Users} from './User.entity';

@Entity()
export class Logs {
  @Column({type: 'integer', nullable: true})
  userId: number;

  @Column({type: 'varchar', nullable: false})
  body: string;

  @Column({type: 'smallint', nullable: false})
  type: ValueOf<typeof logType>;

  @Column({type: 'smallint', nullable: false})
  level: ValueOf<typeof logLevel>;

  @Column({type: 'timestamp', nullable: false})
  createdAt: string;

  @ManyToOne(type => Users, user => user.id)
  @JoinTable()
  user: Users
}