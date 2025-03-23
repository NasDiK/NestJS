import { Column, Entity, JoinTable, ManyToOne } from "typeorm";
import {type} from '../enums/invites';
import {type ValueOf} from '../utils/utilityTypes';
import {Users} from './User.entity';

@Entity()
export class Invites {
  @Column({type: 'integer', nullable: false})
  fromId: number;

  @Column({type: 'integer', nullable: false})
  toId: number;

  @Column({type: 'smallint', nullable: false})
  inviteType: ValueOf<typeof type>;

  @Column({type: 'timestamp', nullable: false})
  createdAt: string;

  @ManyToOne(type => Users, user => user.invitesByUser)
  @JoinTable()
  fromUser: Users

  @ManyToOne(type => Users, user => user.invitesToUser)
  @JoinTable()
  toUser: Users
}