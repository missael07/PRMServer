import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { Record } from './entities/record.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { ErrorHandlerService } from 'src/common/services/handlers/errors.handler';

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
   
    try {
      const { userId, startWeigth } = createRecordDto;
      const existingProfile = await this.recordRepository.findOne({ where: { user: { id: userId } } });
      if (existingProfile) {
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
      const record = await this.recordRepository.create({
        startWeigth,
        user,
        startDate: new Date()
      })

      await this.recordRepository.save(record);

      return record;
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
    const response = await this.recordRepository.find({ relations: ['user'] });

    const responseMapped = response.map( resp => {

      return {
        recordId: resp.id,
        startDate: resp.startDate,
        name: resp.user.fullName,
        userId: resp.user.id
      }
    })

    return responseMapped;
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
    record.age = updateData.age 
    record.gender = updateData.gender 
    record.bdate = updateData.bdate 
    record.civilStatus = updateData.civilStatus 
    record.religion = updateData.religion 
    record.scolarship = updateData.scolarship 
    record.occupation = updateData.occupation 
    record.address = updateData.address 
    record.phone = updateData.phone 
    record.diarrhea = updateData.diarrhea
    record.constipation = updateData.constipation
    record.gastritis = updateData.gastritis
    record.ulcers = updateData.ulcers
    record.nausea = updateData.nausea
    record.pyrosis = updateData.pyrosis
    record.vomiting = updateData.vomiting
    record.colitis = updateData.colitis
    record.stainedTeeth = updateData.stainedTeeth
    record.headache = updateData.headache
    record.kneePain = updateData.kneePain
    record.anemia = updateData.anemia
    record.diabetes = updateData.diabetes
    record.has = updateData.has
    record.overweightObesity = updateData.overweightObesity
    record.surgeries = updateData.surgeries
    record.otherDiseases = updateData.otherDiseases
    record.observations = updateData.observations
    record.diagnosedDisease = updateData.diagnosedDisease
    record.medications = updateData.medications
    record.whichMedications = updateData.whichMedications
    record.supplements = updateData.supplements
    record.familyObesity = updateData.familyObesity
    record.familyDiabetes = updateData.familyDiabetes
    record.familyHta = updateData.familyHta
    record.familyCancer = updateData.familyCancer
    record.familyOther = updateData.familyOther
    record.physicalActivity = updateData.physicalActivity
    record.exercise = updateData.exercise
    record.exerciseType = updateData.exerciseType
    record.exerciseFrequency = updateData.exerciseFrequency
    record.exerciseDuration = updateData.exerciseDuration
    record.exerciseSince = updateData.exerciseSince
    record.alcohol = updateData.alcohol
    record.tobacco = updateData.tobacco
    record.coffee = updateData.coffee
    record.otherSubstances = updateData.otherSubstances
    record.generalSigns = updateData.generalSigns
    record.mealsPerDay = updateData.mealsPerDay
    record.breakfastTime = updateData.breakfastTime
    record.lunchTime = updateData.lunchTime
    record.dinnerTime = updateData.dinnerTime
    record.eatsBetweenMeals = updateData.eatsBetweenMeals
    record.whatEatsBetweenMeals = updateData.whatEatsBetweenMeals
    record.whoPreparesFood = updateData.whoPreparesFood
    record.appetite = updateData.appetite
    record.hungryTime = updateData.hungryTime
    record.foodDiscomfort = updateData.foodDiscomfort
    record.foodAllergy = updateData.foodAllergy
    record.foodAllergySpecific = updateData.foodAllergySpecific
    record.addsSalt = updateData.addsSalt
    record.addsSaltReason = updateData.addsSaltReason
    record.cookingFat = updateData.cookingFat
    record.nutritionalGuidance = updateData.nutritionalGuidance
    record.nutritionalGuidanceReason = updateData.nutritionalGuidanceReason
    record.weightLossMedication = updateData.weightLossMedication
    record.weightLossMedicationDetails = updateData.weightLossMedicationDetails
    record.waterIntake = updateData.waterIntake
    record.isEdit = updateData.isEdit

    return await this.recordRepository.save(record);
  }

}
