import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExerciseEntity } from "../data/entities/exercise.entity";

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
