import { PartialType } from '@nestjs/swagger';
import { CreateNutritionalDietDto } from './create-nutritional-diet.dto';

export class UpdateNutritionalDietDto extends PartialType(CreateNutritionalDietDto) {}
