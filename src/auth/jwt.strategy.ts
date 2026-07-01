import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'temporary-secret-key-for-learning', // AuthModule과 동일한 secret
    });
  }

  async validate(payload: any) {
    // 토큰이 유효하면 이 메서드가 실행되고, 리턴값이 req.user에 담겨요
    return { userId: payload.sub, username: payload.username };
  }
}