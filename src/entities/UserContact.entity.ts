import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import {Users} from './User.entity';

@Entity()
export class UserContacts {
  @Column({type: 'integer', primary: true})
  userFirst: number;

  @Column({type: 'integer', primary: true})
  userSecond: number;

  @ManyToOne(() => Users, user => user.contacts)
  @JoinColumn({ name: 'userFirst' })
  firstUser: Users;

  @ManyToOne(() => Users, user => user.contacts)
  @JoinColumn({ name: 'userSecond' })
  secondUser: Users;
}