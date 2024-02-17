import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {User} from "../data/dto/user";
import {UserEntity} from "../data/entities/user.entity";
import UserToUserEntityMapper from "../utils/mappers/UserToUserEntityMapper";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
        ) {};

    async findOne(username: string): Promise<UserEntity | undefined> {
        const user: UserEntity = await this.userRepository.findOne(
            {
                where: {
                    username: username
                }
            }
        );

        return user;
    }

    async fetchByUsername(username: string): Promise<string> {
        const result: UserEntity = await this.userRepository.findOne({
            select: {
                username: true,
                firstname: false,
                lastname: false,
                mailAddress: false,
                password: false
            },
            where: {
                username: username
            }
        });

        if (!result) {
            throw new NotFoundException(null, `No user found with the username ${username}`);
        }

        return result.username;
    }

    async signup(userCredentials: User): Promise<UserEntity> {
        const userEntity: UserEntity = UserToUserEntityMapper.userToUserEntity(userCredentials);
        const saltOrRounds = 10;
        userEntity.password = await bcrypt.hash(userCredentials.password, saltOrRounds);

        const result: UserEntity = await this.userRepository.save(userEntity, {reload: true});

        if (!result) {
            throw new HttpException("An error occured during sign up", HttpStatus.BAD_REQUEST);
        }

        return result;
    }
}
