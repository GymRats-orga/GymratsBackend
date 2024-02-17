import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { Request } from 'express';
import {AuthService} from "../auth/auth.service";
import {ExercisesService} from "../exercises/exercises.service";
import {UsersService} from "../users/users.service";
import {UserEntity} from "../data/entities/user.entity";
import {ExerciseEntity} from "../data/entities/exercise.entity";
import {JwtService} from "@nestjs/jwt";
import {JwtModule} from "@nestjs/jwt/dist";
import {getRepositoryToken} from "@nestjs/typeorm";
import {Repository} from "typeorm";

describe('AppController', () => {
  let controller: AppController;
  let authService: AuthService;
  let exercisesService: ExercisesService;
  let userService: UsersService;
  let repositoryMock: Partial<Record<keyof Repository<UserEntity>, jest.Mock>>;
  let userRepositoryMock: Partial<Record<keyof Repository<UserEntity>, jest.Mock>>;

  beforeEach(async () => {

    repositoryMock = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AuthService,
        ExercisesService,
        UsersService,
        {
          provide: getRepositoryToken(ExerciseEntity),
          useValue: repositoryMock,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: userRepositoryMock,
        },
      ],
      imports: [JwtModule]
    }).compile();

    controller = module.get<AppController>(AppController);
    authService = module.get<AuthService>(AuthService);
    exercisesService = module.get<ExercisesService>(ExercisesService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /*describe('fetchAllExercises', () => {
    it('should fetch all exercises', () => {
      const mockExercises: ExerciseEntity[] = [{ exercise_id: 1, exercise_name: 'test', body_part: 'back', equipment: 'rope', gifUrl: 'dsfdfd', instructions: 's', secondary_muscles: ['test'], target: 's' }];
      jest.spyOn(exercisesService, 'fetchAll').mockReturnValueOnce(Promise.resolve(mockExercises));

      const result = controller.fetchAllExercises().then(() => {
        expect(result).toEqual(mockExercises);
      });
    });
  });*/

  describe('getUserFromUsername', () => {
    it('should fetch username by username', async () => {
      const mockUsername = 'testuser';
      const mockUser = 'testuser';
      jest.spyOn(userService, 'fetchByUsername').mockResolvedValueOnce(mockUser);

      const result = await controller.getUserFromUsername(mockUsername);

      expect(result).toEqual(mockUser);
    });
  });

  describe('signup', () => {
    it('should sign up a user', async () => {
      const mockRequest = { body: { username: 'testuser', password: 'testpassword' } } as Request;
      const mockUser: UserEntity = { userId: 454, username: 'testuser', password: 'hashedpassword', mailAddress: 'test', firstname: 'test', lastname: 'test' };
      jest.spyOn(userService, 'signup').mockResolvedValueOnce(mockUser);

      const result = await controller.signup(mockRequest);

      expect(result).toEqual(mockUser);
    });
  });
});
