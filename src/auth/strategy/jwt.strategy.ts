import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { JWTPayload } from '../interface/jwt-payload.interface';
import { AuthService } from '../service/auth.service';
import { UserService } from 'src/users/service/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'asdhfkjadshkjg',
    });
  }

  async validate(payload: JWTPayload) {
    const auth = await this.authService.validate(payload.id);
    const user = await this.userService.getByAuthId(auth.id);
    return user;
  }
}
