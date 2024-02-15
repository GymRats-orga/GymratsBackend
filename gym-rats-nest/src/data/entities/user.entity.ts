import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @Column({ length: 50, nullable: true })
  firstname: string;

  @Column({ length: 50, nullable: true })
  lastname: string;

  @Column({ length: 50, nullable: false, name: 'mail_address' })
  mailAddress: string;

  @Column({ length: 100, nullable: false })
  password: string;

  @Column({ length: 100, nullable: true })
  username: string;
}
