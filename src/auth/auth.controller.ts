import { Controller, Get, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signIn.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { Auth } from './decorators/auth.decorator';
import { ValidRoles } from './interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.sigUp(createUserDto);
  }

  @Post('signIn')
  signIn(@Body() signinDto: SignInDto) {
    return this.authService.signIn(signinDto);
  }
  
  @Get('checkStatus')
  @Auth(ValidRoles.patient, ValidRoles.admin)
  @ApiBearerAuth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }
}
