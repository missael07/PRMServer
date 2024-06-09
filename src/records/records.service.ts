import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { Record } from './entities/record.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { ErrorHandlerService } from 'src/common/services/handlers/errors.handler';
import { UpdateCommonDto } from '../common/dto/update-common.dto';

@Injectable()
export class RecordsService {

  constructor(
    @InjectRepository(Record)
    private recordRepository: Repository<Record>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly errorHandlerService: ErrorHandlerService,
    
  ) {}

  async create(createRecordDto: CreateRecordDto) {
    const { userId, startWeigth } = createRecordDto;
    const existingProfile = await this.recordRepository.findOne({ where: { user: { id: userId } } });
    if (existingProfile) {
      console.log(123)
      this.errorHandlerService.handleExceptions(
        '409',
        'User already has a record',
      );
      
    }
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      this.errorHandlerService.handleExceptions(
        '404',
        'User not found',
      );
      
    }
    try {
        
      const record = await this.recordRepository.create({
        startWeigth,
        user,
        startDate: new Date()
      })

      await this.recordRepository.save(record);

      return this.recordRepository.save(record);
    } catch (error) {
      this.errorHandlerService.handleExceptions(
        error.status,
        error.message,
      );
    }
   
  }

  async getRecordByUserId(recordId: string){
    return await this.recordRepository.findOne( { relations: ['user'], where: { id: recordId } });
  }

  async getAllRecords() {
    return await this.recordRepository.find({ relations: ['user'] });
  }

  async updateRecord(id: string, updateData: UpdateRecordDto){
    const record = await this.recordRepository.findOne({ where: { id } });
    if (!record) {
      this.errorHandlerService.handleExceptions(
        '404',
        'Record not found',
      );
    }

    record.startWeigth = updateData.startWeigth;

    return await this.recordRepository.save(record);
  }

}
