import { Category } from '../../category/entity/category.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Auth } from '../../auth/entity/auth.entity';

export enum UserRole {
  ADMIN = 'admin',
  User = 'user',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  country: string;

  @OneToMany(() => Category, (cat) => cat.user)
  categories: Category[];

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;

  @OneToOne(() => Auth)
  @JoinColumn({ name: 'authId' })
  auth: Auth;

  @Column()
  authId: number;
}
