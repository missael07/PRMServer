import { Module } from '@nestjs/common';
import { NutritionalDietService } from './nutritional-diet.service';
import { NutritionalDietController } from './nutritional-diet.controller';
import { ErrorHandlerService } from 'src/common/services/handlers/errors.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NutritionalDiet } from './entities/nutritional-diet.entity';
import { Record } from 'src/records/entities/record.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([NutritionalDiet, Record])],
  controllers: [NutritionalDietController],
  providers: [NutritionalDietService, ErrorHandlerService],
})
export class NutritionalDietModule {}
