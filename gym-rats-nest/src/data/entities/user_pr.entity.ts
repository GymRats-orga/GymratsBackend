import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { RecordEntity } from './record.entity'; 
import { UserEntity } from './user.entity';

@Entity('user_pr')
export class UserPrEntity {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  @PrimaryGeneratedColumn({ name: 'record_id' })
  recordId: number;

  @ManyToOne(() => UserEntity, (user) => user.userId, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => RecordEntity, (record) => record.record_id, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'record_id' })
  record: RecordEntity;
}
