import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExerciseEntity } from 'src/data/entities/exercise.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseEntity])],
  providers: [ExercisesService],
  exports: [ExercisesService]
})
export class ExercisesModule {}
