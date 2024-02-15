import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProgramEntity } from './program.entity';
import { TargetZoneEntity } from './target_zone.entity';

@Entity('target_zone_reference')
export class TargetZoneReference {
  @PrimaryGeneratedColumn({ name: 'program_id' })
  programId: number;

  @PrimaryGeneratedColumn({ name: 'target_zone_id' })
  targetZoneId: number;

  @ManyToOne(() => ProgramEntity, (program) => program.programId, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  program: ProgramEntity;

  @ManyToOne(() => TargetZoneEntity, (targetZone) => targetZone.targetZoneId, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  targetZone: TargetZoneEntity;
}
