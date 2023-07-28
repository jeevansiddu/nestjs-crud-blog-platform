import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: '_id' });
  }

  async validate(_id: string, password: string): Promise<any> {
    const userId = Number(_id);
    const user = await this.authService.validateUser(userId, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
