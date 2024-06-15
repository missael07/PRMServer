import { Injectable } from '@nestjs/common';
import { CreateNutritionalDietDto } from './dto/create-nutritional-diet.dto';
import { UpdateNutritionalDietDto } from './dto/update-nutritional-diet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NutritionalDiet } from './entities/nutritional-diet.entity';
import { Repository } from 'typeorm';
import { Record } from 'src/records/entities/record.entity';
import { ErrorHandlerService } from '../common/services/handlers/errors.handler';
import { UploadApiResponse,UploadApiErrorResponse, v2 as cloudinary } from 'cloudinary';

interface FileResponse {
  asset_id:             string;
  public_id:            string;
  format:               string;
  version:              number;
  resource_type:        string;
  type:                 string;
  created_at:           Date;
  bytes:                number;
  width:                number;
  height:               number;
  folder:               string;
  access_mode:          string;
  url:                  string;
  secure_url:           string;
  next_cursor:          string;
  derived:              any[];
  rate_limit_allowed:   number;
  rate_limit_reset_at:  Date;
  rate_limit_remaining: number;
}
@Injectable()
export class NutritionalDietService {
  constructor(
    @InjectRepository(NutritionalDiet)
    private nutritionalDietRepository: Repository<NutritionalDiet>,
    @InjectRepository(Record)
    private recordRepository: Repository<Record>,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async createNutritionalDiet(
    recordId: string, file: Express.Multer.File,
  ): Promise<NutritionalDiet> {
    const newFile = <FileResponse>(await this.uploadFile(file));
    
    try {
      const record = await this.recordRepository.findOne({
        where: { id: recordId },
      });
      if (!record) {
        this.deleteFile(newFile.public_id);
        this.errorHandlerService.handleExceptions('404', 'Record not found');
      }

      const from = new Date();
      const to = new Date();
      to.setDate(from.getDate() + 15);
      
      const nutritionalDiet = await this.nutritionalDietRepository.create({
        record,
        publicId: newFile.public_id,
        secureName: newFile.secure_url,
        from,
        to,
      });

      await this.nutritionalDietRepository.save(nutritionalDiet);

      return nutritionalDiet;
      return
    } catch (error) {
      this.deleteFile(newFile.public_id);
      this.errorHandlerService.handleExceptions(error.status, error.message);
    }
  }

  async getNutritionalDietsByRecordId(
    recordId: string,
  ): Promise<NutritionalDiet[]> {
    return this.nutritionalDietRepository.find({
      where: { record: { id: recordId } },
      relations: ['record'],
    });
  }

  async getAllNutritionalDiets(): Promise<NutritionalDiet[]> {
    return this.nutritionalDietRepository.find({ relations: ['record'] });
  }

  async uploadFile(file: Express.Multer.File) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        },
      ).end(file.buffer);
    });
  }

  async getFileUrl(publicId: string) {
    return cloudinary.api.resource(publicId);
  }

  async deleteFile( publicId: string) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      
      if(result.result !== 'ok'){
        this.errorHandlerService.handleExceptions('404', 'Not file found');
      }
      return result.result === 'ok';
    } catch (error) {
      console.error('Error al eliminar la imagen de Cloudinary:', error);
      this.errorHandlerService.handleExceptions(error.status, error.message);
      return false;
    }
  }

  async deleteDiet(id: string, publicId: string) {
    try {

      const result = await this.nutritionalDietRepository.delete(id)
      if (result.raw ) {

        this.deleteFile(publicId);
      }
      return 'ok';
    } catch (error) {
      console.error('Error al eliminar la Dieta:', error);
      this.errorHandlerService.handleExceptions(error.status, error.message);
      return false;
    }
  }
}
