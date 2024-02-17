import { Test, TestingModule } from '@nestjs/testing';
import { ExercisesService } from './exercises.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ExerciseEntity } from '../data/entities/exercise.entity';
import {Repository} from "typeorm";

describe('ExercisesService', () => {
  let service: ExercisesService;
  let repositoryMock: Partial<Record<keyof Repository<ExerciseEntity>, jest.Mock>>;

  beforeEach(async () => {
    repositoryMock = {
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExercisesService,
        {
          provide: getRepositoryToken(ExerciseEntity),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<ExercisesService>(ExercisesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetchAll', () => {
    it('should fetch all exercises', async () => {
      const mockExercises = [{ id: 1, name: 'Exercise 1' }, { id: 2, name: 'Exercise 2' }];
      repositoryMock.find.mockResolvedValueOnce(mockExercises);

      const exercises = await service.fetchAll();

      expect(exercises).toEqual(mockExercises);
      expect(repositoryMock.find).toHaveBeenCalledTimes(1);
    });
  });
});
