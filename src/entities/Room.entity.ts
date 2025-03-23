import { Column, Entity, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {RoomMessages} from './RoomMessage.entity';
import {Users} from './User.entity';
import {UserRooms} from './UserRooms.entity';

@Entity()
export class Rooms {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255, nullable: false})
  title: string;

  @OneToMany(type => RoomMessages, msg => msg.roomId, {cascade: true})
  @JoinTable()
  messages: RoomMessages[]

  @OneToMany(type => UserRooms, usr => usr.roomId, {cascade: true})
  @JoinTable()
  participiants: UserRooms[]
}