import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {UsersRights} from './UserRight.entity';
import {UserRooms} from './UserRooms.entity';
import {Invites} from './Invite.entity';
import {UserContacts} from './UserContact.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn({type: 'integer'})
  id: number;

  @Column({nullable: false, unique: true, length: 100, comment: 'Логин, имя для входа', type: 'varchar'})
  username: string;

  @Column({nullable: false, length: 255, comment: 'Отображаемое имя', type: 'varchar'})
  fullName: string;

  @Column({nullable: false, comment: 'Hash', type: 'varchar'})
  password: string;

  @Column({type: 'timestamp', nullable: false})
  createdAt: string;

  @Column({type: 'timestamp', nullable: true})
  blockedUntil: string;

  @OneToMany((type) => UsersRights, userRight => userRight.userId, {cascade: true})
  @JoinTable()
  userRights: UsersRights[]

  @OneToMany((type) => UserRooms, userRoom => userRoom.userId, {cascade: true})
  @JoinTable()
  userRooms: UserRooms[]

  @OneToMany((type) => Invites, invite => invite.fromId, {cascade: true})
  @JoinTable()
  invitesByUser: Invites[]

  @OneToMany((type) => Invites, invite => invite.toId, {cascade: true})
  @JoinTable()
  invitesToUser: Invites[]

  // Связь с UserContacts, где пользователь является userFirst
  @OneToMany(() => UserContacts, userContacts => userContacts.firstUser)
  firstUserContacts: UserContacts[];
  
  // Связь с UserContacts, где пользователь является userSecond
  @OneToMany(() => UserContacts, userContacts => userContacts.secondUser)
  secondUserContacts: UserContacts[];

  get contacts(): Users[] {
    const firstContacts = this.firstUserContacts?.map(contact => contact.secondUser) || [];
    const secondContacts = this.secondUserContacts?.map(contact => contact.firstUser) || [];

    return [...firstContacts, ...secondContacts];
  }
}