import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { CreateUserDto, SignInDto } from './dto';
import { User } from './entities/user.entity';
import { ErrorHandlerService } from 'src/common/services/handlers/errors.handler';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,    
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly jwtService: JwtService,
  ) {
    errorHandlerService.logger = new Logger('AuthService');
  }

  async sigUp(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = await this.userRepo.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepo.save(user);

      delete user.password;

      return { ...user, token: this._getJwt({ id: user.id, name: user.fullName, role: user.roles }) };
    } catch (error) {
      this.errorHandlerService.handleExceptions(
        error.code,
        error.detail,
      );
    }
  }

  async signIn(signInDto: SignInDto) {
    const { password, email } = signInDto;
    const user = await this.userRepo.findOne({
      where: { email },
      select: { email: true, password: true, id: true, roles: true },
    });

    if (!user || !bcrypt.compareSync(password, user.password))
      this.errorHandlerService.handleExceptions(
        '401',
        'Invalid Credentials',
      );

    delete user.password;
    return { ...user, token: this._getJwt({ id: user.id, name: user.fullName, role: user.roles  }) };
  }

  async checkAuthStatus(user: User) {
    try {
      return {
        ...user,
        token: this._getJwt({ id: user.id, name: user.fullName , role: user.roles })
      }
    } catch (error) {
      this.errorHandlerService.handleExceptions(
        error.code,
        error.detail,
      );
    }
  }

  private _getJwt(payload: JWTPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}