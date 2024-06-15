import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { NutritionalDietService } from './nutritional-diet.service';
import { CreateNutritionalDietDto } from './dto/create-nutritional-diet.dto';
import { UpdateNutritionalDietDto } from './dto/update-nutritional-diet.dto';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('nutritional-diet')
export class NutritionalDietController {
  constructor(private readonly nutritionalDietService: NutritionalDietService) {}

  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  create(@Param('id') id: string,@UploadedFile() file: Express.Multer.File) {
    return this.nutritionalDietService.createNutritionalDiet(id, file);
  }
  
  @Get(':id')
  getNutritionalDietById(@Param('id') id: string){
    return this.nutritionalDietService.getNutritionalDietsByRecordId(id);
  }

  @Get('getFile/:id')
  findOne(@Param('id') id: string) {

    return this.nutritionalDietService.getFileUrl(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNutritionalDietDto: UpdateNutritionalDietDto) {
  //   return this.nutritionalDietService.update(+id, updateNutritionalDietDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string, @Query('publicId') publicId: string) {
    await this.nutritionalDietService.deleteDiet(id, publicId);

    return { message: 'Diet deleted successfully' };
  }
}
