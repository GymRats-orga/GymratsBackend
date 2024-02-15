import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'SECRET' // TODO, protect this
        });
    }

    async validate(payload: any) {
        // TODO const currentUser = await this.userService.getById(payload.sub); 
        // then when we have the user, put it in the jotai context  
        return {
            id: payload.sub,
            username: payload.username
        }
    }
}