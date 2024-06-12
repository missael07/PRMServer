import { Injectable, Logger } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/patient.entity';
import { ILike, Like, Repository } from 'typeorm';
import { ErrorHandlerService } from 'src/common/services/handlers/errors.handler';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PatientsService {

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,    
    private readonly errorHandlerService: ErrorHandlerService,
  ) {
    errorHandlerService.logger = new Logger('AuthService');
  }

  async create(createPatientDto: CreatePatientDto) {
    try {
      const { password, ...userData } = createPatientDto;

      const user = await this.userRepo.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepo.save(user);

      delete user.password;

      return { ...user };
    } catch (error) {
      this.errorHandlerService.handleExceptions(
        error.code,
        error.detail,
      );
    }
  }

  async findAll(term: string) {
    return await this.userRepo.find({
      where:[ 
        { fullName: ILike(`%${term}%`) },
        { email: ILike(`%${term}%`) } 
        
      ] 
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
