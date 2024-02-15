import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity'; // Assurez-vous d'importer correctement l'entité User

@Entity('program')
export class ProgramEntity {
  @PrimaryGeneratedColumn({ name: 'program_id' })
  programId: number;

  @Column({ name: 'program_name', length: 150 })
  programName: string;

  @Column({ name: 'day', type: 'date' })
  day: Date;

  @Column({ name: 'duration', type: 'smallint' })
  duration: number;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.userId, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  user: UserEntity;
}