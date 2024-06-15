import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNumber, IsString } from "class-validator";

export class UpdateRecordDto {
    @ApiProperty()
    @IsNumber()
    age?: number;
    @ApiProperty()
    @IsNumber()
    startWeigth?: number;
    @ApiProperty()
    @IsString()
    gender?: string;
    @ApiProperty()
    @IsDateString()
    bdate?: Date;
    @ApiProperty()
    @IsString()
    civilStatus?: string;
    @ApiProperty()
    @IsString()
    religion?: string;
    @ApiProperty()
    @IsString()
    scolarship?: string;
    @ApiProperty()
    @IsString()
    occupation?: string;
    @ApiProperty()
    @IsString()
    address?: string;
    @ApiProperty()
    @IsString()
    phone?: string;
    @ApiProperty()
    @IsBoolean()
    diarrhea?: boolean;
    @ApiProperty()
    @IsBoolean()
    constipation?: boolean;
    @ApiProperty()
    @IsBoolean()
    gastritis?: boolean;
    @ApiProperty()
    @IsBoolean()
    ulcers?: boolean;
    @ApiProperty()
    @IsBoolean()
    nausea?: boolean;
    @ApiProperty()
    @IsBoolean()
    pyrosis?: boolean;
    @ApiProperty()
    @IsBoolean()
    vomiting?: boolean;
    @ApiProperty()
    @IsBoolean()
    colitis?: boolean;
    @ApiProperty()
    @IsBoolean()
    stainedTeeth?: boolean;
    @ApiProperty()
    @IsBoolean()
    headache?: boolean;
    @ApiProperty()
    @IsBoolean()
    kneePain?: boolean;
    @ApiProperty()
    @IsBoolean()
    anemia?: boolean;
    @ApiProperty()
    @IsBoolean()
    diabetes?: boolean;
    @ApiProperty()
    @IsBoolean()
    has?: boolean;
    @ApiProperty()
    @IsBoolean()
    overweightObesity?: boolean;
    @ApiProperty()
    @IsBoolean()
    surgeries?: boolean;
    @ApiProperty()
    @IsString()
    otherDiseases?: string;
    @ApiProperty()
    @IsString()
    observations?: string;
    @ApiProperty()
    @IsString()
    diagnosedDisease?: string;
    @ApiProperty()
    @IsBoolean()
    medications?: boolean;
    @ApiProperty()
    @IsString()
    whichMedications?: string;
    @ApiProperty()
    @IsString()
    supplements?: string;
    @ApiProperty()
    @IsBoolean()
    familyObesity?: boolean;
    @ApiProperty()
    @IsBoolean()
    familyDiabetes?: boolean;
    @ApiProperty()
    @IsBoolean()
    familyHta?: boolean;
    @ApiProperty()
    @IsBoolean()
    familyCancer?: boolean;
    @ApiProperty()
    @IsString()
    familyOther?: string;
    @ApiProperty()
    @IsString()
    physicalActivity?: string;
    @ApiProperty()
    @IsBoolean()
    exercise?: boolean;
    @ApiProperty()
    @IsString()
    exerciseType?: string;
    @ApiProperty()
    @IsString()
    exerciseFrequency?: string;
    @ApiProperty()
    @IsString()
    exerciseDuration?: string;
    @ApiProperty()
    @IsString()
    exerciseSince?: string;
    @ApiProperty()
    @IsString()
    alcohol?: string;
    @ApiProperty()
    @IsString()
    tobacco?: string;
    @ApiProperty()
    @IsString()
    coffee?: string;
    @ApiProperty()
    @IsString()
    otherSubstances?: string;
    @ApiProperty()
    @IsString()
    generalSigns?: string;
    @ApiProperty()
    @IsNumber()
    mealsPerDay?: number | null;
    @ApiProperty()
    @IsString()
    breakfastTime?: string;
    @ApiProperty()
    @IsString()
    lunchTime?: string;
    @ApiProperty()
    @IsString()
    dinnerTime?: string;
    @ApiProperty()
    @IsBoolean()
    eatsBetweenMeals?: boolean;
    @ApiProperty()
    @IsString()
    whatEatsBetweenMeals?: string;
    @ApiProperty()
    @IsString()
    whoPreparesFood?: string;
    @ApiProperty()
    @IsString()
    appetite?: string;
    @ApiProperty()
    @IsString()
    hungryTime?: string;
    @ApiProperty()
    @IsString()
    foodDiscomfort?: string;
    @ApiProperty()
    @IsBoolean()
    foodAllergy?: boolean;
    @ApiProperty()
    @IsString()
    foodAllergySpecific?: string;
    @ApiProperty()
    @IsBoolean()
    addsSalt?: boolean;
    @ApiProperty()
    @IsString()
    addsSaltReason?: string;
    @ApiProperty()
    @IsString()
    cookingFat?: string;
    @ApiProperty()
    @IsBoolean()
    nutritionalGuidance?: boolean;
    @ApiProperty()
    @IsString()
    nutritionalGuidanceReason?: string;
    @ApiProperty()
    @IsBoolean()
    weightLossMedication?: boolean;
    @ApiProperty()
    @IsString()
    weightLossMedicationDetails?: string;
    @ApiProperty()
    @IsNumber()
    waterIntake?: number | null;
    @ApiProperty()
    @IsBoolean()
    isEdit?: boolean;


}
