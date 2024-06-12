import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { RecordsModule } from './records/records.module';
import { NutritionalDietModule } from './nutritional-diet/nutritional-diet.module';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true,
    synchronize: true,

  }), AuthModule, CommonModule, RecordsModule, NutritionalDietModule, PatientsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
