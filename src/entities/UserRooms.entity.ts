import { Column, Entity, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {Users} from './User.entity';
import {Rooms} from './Room.entity';

@Entity()
export class UserRooms {
  @Column({type: 'integer', primary: true})
  userId: number;

  @Column({type: 'integer', primary: true})
  roomId: number;

  @Column({type: 'integer', nullable: false})
  rights: number;

  @OneToOne(type => Users, user => user.id, {cascade: true})
  @JoinTable()
  user: Users;

  @OneToOne(type => Rooms, room => room.id, {cascade: true})
  @JoinTable()
  rooms: Rooms;
}