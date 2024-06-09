import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  
  @Injectable()
  export class ErrorHandlerService {
    loggerFrom: string = '';
    logger = new Logger();
  
    handleExceptions(error: any, code: string, message: string): never {
      
      if (error) this.logger.error(error);
      this.logger.error(message);
      switch (code) {
        case '23505':
          throw new BadRequestException(message);
        case '404':
          throw new NotFoundException(message);
        case '401':
          throw new UnauthorizedException(message);
        case '403':
          throw new ForbiddenException(message);
        default:
          throw new InternalServerErrorException(
            'Unexpected error - Check Server Logs',
          );
      }
    }
  }