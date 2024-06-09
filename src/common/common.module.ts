import { Module } from '@nestjs/common';
import { ErrorHandlerService } from './services/handlers/errors.handler';

@Module({
  providers: [ErrorHandlerService],
  exports: [ErrorHandlerService]
})
export class CommonModule {}
