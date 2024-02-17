import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, HttpException } from '@nestjs/common';
import {UsersService} from "./users.service";
import {User} from "../data/dto/user";
import {UserEntity} from "../data/entities/user.entity";

describe('UsersService', () => {
  let service: UsersService;
  let repositoryMock: Partial<Record<keyof Repository<UserEntity>, jest.Mock>>;

  beforeEach(async () => {
    repositoryMock = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should find a user by username', async () => {
      const mockUserEntity: UserEntity = { userId: 1, username: 'testuser', password: 'hashedpassword', firstname: 'test', lastname: 'test', mailAddress: 'test' };
      repositoryMock.findOne.mockResolvedValueOnce(mockUserEntity);

      const user = await service.findOne('testuser');

      expect(user).toEqual(mockUserEntity);
      expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { username: 'testuser' } });
    });
  });

  describe('fetchByUsername', () => {
    it('should fetch username by username', async () => {
      const mockUserEntity: UserEntity = { userId: 1, username: 'testuser', password: 'hashedpassword', firstname: 'test', lastname: 'test', mailAddress: 'test' };
      repositoryMock.findOne.mockResolvedValueOnce(mockUserEntity);

      const username = await service.fetchByUsername('testuser');

      expect(username).toEqual('testuser');
      expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { username: 'testuser' }, select: { username: true, firstname: false, lastname: false, mailAddress: false, password: false } });
    });

    it('should throw NotFoundException if user not found', async () => {
      repositoryMock.findOne.mockResolvedValueOnce(undefined);

      await expect(service.fetchByUsername('nonexistinguser')).rejects.toThrowError(NotFoundException);
    });
  });

  describe('signup', () => {
    it('should create a new user', async () => {
      const mockUserCredentials: User = { username: 'testuser', password: 'testpassword', id: 1, firstname: 'test', lastname: 'test', mailAddress: 'test'  };
      const mockUserEntity: UserEntity = { userId: 1, username: 'testuser', password: 'hashedpassword', firstname: 'test', lastname: 'test', mailAddress: 'test' };
      repositoryMock.save.mockResolvedValueOnce(mockUserEntity);

      const savedUser = await service.signup(mockUserCredentials);

      expect(savedUser).toEqual(mockUserEntity);
      expect(repositoryMock.save).toHaveBeenCalledWith(expect.any(UserEntity), { reload: true });
    });

    it('should throw HttpException if save fails', async () => {
      const mockUserCredentials: User = { username: 'testuser', password: 'testpassword', id: 1, firstname: 'test', lastname: 'test', mailAddress: 'test'  };
      repositoryMock.save.mockResolvedValueOnce(undefined);

      await expect(service.signup(mockUserCredentials)).rejects.toThrowError(HttpException);
    });
  });
});
