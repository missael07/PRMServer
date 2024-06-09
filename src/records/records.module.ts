import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { ErrorHandlerService } from 'src/common/services/handlers/errors.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './entities/record.entity';
import { User } from 'src/auth/entities/user.entity';

@Module({
  controllers: [RecordsController],
  providers: [RecordsService, ErrorHandlerService],
  imports: [TypeOrmModule.forFeature([Record, User])]
})
export class RecordsModule {}
