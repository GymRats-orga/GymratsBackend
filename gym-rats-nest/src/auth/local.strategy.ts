import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super(); // configuration has to be written here if the strat implies some
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);

        // If there is no user, in front we can use it to start sign up protocol
        if (!user) {
            throw new UnauthorizedException(null, "Invalid credentials");
        }

        return user;
    }
}