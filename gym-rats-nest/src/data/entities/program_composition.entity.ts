import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProgramEntity } from './program.entity'; 
import { ExerciseEntity } from './exercise.entity'; 

@Entity('program_composition')
export class ProgramCompositionEntity {
  @PrimaryGeneratedColumn({ name: 'program_id' })
  programId: number;

  @PrimaryGeneratedColumn({ name: 'exercise_id' })
  exerciseId: number;

  @Column({ name: 'sets_nb', type: 'smallint', nullable: true })
  setsNb: number;

  @Column({ name: 'reps_nb', type: 'smallint', nullable: true })
  repsNb: number;

  @Column({ name: 'rest_time', type: 'smallint', nullable: true })
  restTime: number;

  @ManyToOne(() => ProgramEntity, (program) => program.programId, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'program_id' })
  program: ProgramEntity;

  @ManyToOne(() => ExerciseEntity, (exercise) => exercise.exercise_id, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'exercise_id' })
  exercise: ExerciseEntity;
}
