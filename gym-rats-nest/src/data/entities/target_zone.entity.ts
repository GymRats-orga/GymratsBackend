import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('target_zone')
export class TargetZoneEntity {
    @PrimaryGeneratedColumn({ name: 'target_zone_id' })
    targetZoneId: number;

    @Column({ length: 50, nullable: false, name: 'zone_name' })
    zoneName: string;
}