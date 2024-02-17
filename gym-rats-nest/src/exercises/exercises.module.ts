import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ExerciseEntity} from "../data/entities/exercise.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseEntity])],
  providers: [ExercisesService],
  exports: [ExercisesService]
})
export class ExercisesModule {}
