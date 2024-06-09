import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { ErrorHandlerService } from 'src/common/services/handlers/errors.handler';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(private readonly reflector: Reflector, private readonly errorHandlerService: ErrorHandlerService){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: string[] = this.reflector.get( META_ROLES, context.getHandler() );

    if ( !validRoles ) return true;
    if ( validRoles.length === 0 ) return true;

    const request = context.switchToHttp().getRequest();

    const user = request['user'] as User;

    if ( !user ) this.errorHandlerService.handleExceptions(null, '404', 'User not found.');

    if ( validRoles.includes(user.roles)) {
      return true;
    }
    
  
    this.errorHandlerService.handleExceptions(null, '403', `User ${user.fullName} must has at least one of the following roles: [${validRoles}]` );
  
  }
}