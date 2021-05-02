import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, userPass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && user.userPassword === userPass) {
            const { userPassword, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {
            email: user.email,
            userId: user._id,
            authorizedTrackers: user.authorizedTrackers,
            name: user.name,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
