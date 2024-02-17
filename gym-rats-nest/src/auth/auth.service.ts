import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {};

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (!user) {
        throw new NotFoundException(null, "No user found with those credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const { password, username, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(user: any): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.id };

    return {
        access_token: this.jwtService.sign(payload)
    };
  }

  async encodePassword(rawPassword: string) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword: string = bcrypt.hashSync(rawPassword, salt); // second parameter is salt, it should be taken from sign up
  }
}
