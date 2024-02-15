import { Controller, Get, UseGuards, Post, Req, Param, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { ExercisesService } from 'src/exercises/exercises.service';
import { UsersService } from 'src/users/users.service';

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
  fetchAllExercises(): any { 
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
