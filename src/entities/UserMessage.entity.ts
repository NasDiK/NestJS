import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {Users} from './User.entity';

@Entity()
export class UserMessages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'integer', nullable: false})
  messageFrom: number;

  @Column({type: 'integer', nullable: false})
  messageTo: number;

  @Column({type: 'timestamp', nullable: false})
  sendedAt: string;

  @Column({type: 'timestamp', nullable: true})
  readedAt: string;

  @Column({type: 'text', nullable: false})
  content: string;

  @ManyToOne(type => Users, usr => usr.id, {cascade: true})
  @JoinTable()
  messageFromUser: Users

  @ManyToOne(type => Users, usr => usr.id, {cascade: true})
  @JoinTable()
  messageToUser: Users
}