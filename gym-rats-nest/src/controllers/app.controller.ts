import { Controller, Get, UseGuards, Post, Req, Param, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import {AuthService} from "../auth/auth.service";
import {ExercisesService} from "../exercises/exercises.service";
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UsersService} from "../users/users.service";
import {ExerciseEntity} from "../data/entities/exercise.entity";

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly exercisesService: ExercisesService, private readonly userService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() request): Promise<{access_token: string}> {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected(@Req() request): {id: string, username: string} { 
    return request.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('all-exercises')
  fetchAllExercises(): Promise<ExerciseEntity[]> {
    return this.exercisesService.fetchAll();
  }

  @Get('user/exists/:username')
  getUserFromUsername(@Param('username') username: string): Promise<string> {
    return this.userService.fetchByUsername(username);
  }

  @Post('signup')
  signup(@Req() credentials: Request) {
    return this.userService.signup(credentials.body);
  }
}
