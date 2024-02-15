import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseEntity } from 'src/data/entities/exercise.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExercisesService {
    constructor(
        @InjectRepository(ExerciseEntity)
        private readonly exercisesRepository: Repository<ExerciseEntity | undefined>
    ) {};

    fetchAll() {
        return this.exercisesRepository.find();
    }
}
