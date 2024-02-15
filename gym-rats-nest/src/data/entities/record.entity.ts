import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ExerciseEntity } from './exercise.entity';

@Entity('record')
export class RecordEntity {
  @PrimaryGeneratedColumn()
  record_id: number;

  @Column({ nullable: true })
  weight: number; // kg, because yes, we use metric system !
  
  @Column({ nullable: true })
  nb_rep: number;

  @ManyToOne(() => ExerciseEntity, exercise_id => exercise_id.exercise_id)
  exercise_id: number;
}
