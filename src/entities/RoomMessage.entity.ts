import { Column, Entity, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {Users} from './User.entity'
import {Rooms} from './Room.entity'

@Entity()
export class RoomMessages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'text', nullable: false})
  content: string;

  @Column({type: 'integer', nullable: false})
  roomId: number;

  @Column({type: 'integer', nullable: false})
  fromUserId: number;

  @Column({type: 'timestamp', nullable: false})
  createdAt: string;

  @ManyToOne(type => Users, usr => usr.id, {cascade: true})
  @JoinTable()
  user: Users

  @ManyToOne(type => Rooms, usr => usr.id, {cascade: true})
  @JoinTable()
  room: Rooms
}