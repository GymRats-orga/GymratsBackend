import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('exercise')
export class ExerciseEntity {
  @PrimaryGeneratedColumn()
  exercise_id: number;

  @Column({ name: 'exercise_name', length: 100, nullable: false })
  exercise_name: string;

  @Column({ name: 'body_part', length: 100, nullable: true })
  body_part: string;

  @Column({ name: 'equipment', length: 100, nullable: true })
  equipment: string;

  @Column({ name: 'gifUrl', length: 100, nullable: true })
  gifUrl: string;

  @Column({ name: 'target', length: 100, nullable: true })
  target: string;

  @Column('varchar', { name: 'secondary_muscles', array: true, nullable: true })
  secondary_muscles: string[];

  @Column('text', { name: 'instructions', nullable: true })
  instructions: string;
}
