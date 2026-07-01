import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string) {
        const user = await this.usersService.findOne(username);

        // 우선 비밀번호를 단순 비교로 처리 (실제 환경에서는 해시 비교 필요)
        if (user && user.password === pass) {
            const { password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(username: string, pass: string) {
        const user = await this.validateUser(username, pass);
        if (!user) {
            throw new UnauthorizedException('아이디 또는 비밀번호가 올바르지 않습니다.');
        }

        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
