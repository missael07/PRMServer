import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entities/user.entity';
import { JWTPayload } from '../interfaces/';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ErrorHandlerService } from 'src/common/services/handlers/errors.handler';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    configService: ConfigService,
    private readonly _handleErrorsService: ErrorHandlerService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JWTPayload): Promise<User> {
    const { id } = payload;

    const user = await this.userRepo.findOneBy({ id });

    if (!user)
      this._handleErrorsService.handleExceptions('404', 'User not foud.');
    if (!user.isActive)
      this._handleErrorsService.handleExceptions(
        '403',
        `${user.fullName} is inactive, talk with the administartor`,
      );

    return user;
  }
}
