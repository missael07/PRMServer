import { User } from "src/auth/entities/user.entity";
import { NutritionalDiet } from "src/nutritional-diet/entities/nutritional-diet.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('records')
export class Record {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('date')
    startDate: Date;
    @Column( { nullable: true})
    age?: number;
    @Column( { nullable: true})
    startWeigth?: number;
    @Column( { nullable: true})
    gender?: string;
    @Column( 'date', { nullable: true})
    bdate?: Date;
    @Column( { nullable: true})
    civilStatus?: string;
    @Column( { nullable: true})
    religion?: string;
    @Column( { nullable: true})
    scolarship?: string;
    @Column( { nullable: true})
    occupation?: string;
    @Column( { nullable: true})
    address?: string;
    @Column( { nullable: true})
    phone?: string;
    @Column( { nullable: true})
    diarrhea?: boolean;
    @Column( { nullable: true})
    constipation?: boolean;
    @Column( { nullable: true})
    gastritis?: boolean;
    @Column( { nullable: true})
    ulcers?: boolean;
    @Column( { nullable: true})
    nausea?: boolean;
    @Column( { nullable: true})
    pyrosis?: boolean;
    @Column( { nullable: true})
    vomiting?: boolean;
    @Column( { nullable: true})
    colitis?: boolean;
    @Column( { nullable: true})
    stainedTeeth?: boolean;
    @Column( { nullable: true})
    headache?: boolean;
    @Column( { nullable: true})
    kneePain?: boolean;
    @Column( { nullable: true})
    anemia?: boolean;
    @Column( { nullable: true})
    diabetes?: boolean;
    @Column( { nullable: true})
    has?: boolean;
    @Column( { nullable: true})
    overweightObesity?: boolean;
    @Column( { nullable: true})
    surgeries?: boolean;
    @Column( { nullable: true})
    otherDiseases?: string;
    @Column( { nullable: true})
    observations?: string;
    @Column( { nullable: true})
    diagnosedDisease?: string;
    @Column( { nullable: true})
    medications?: boolean;
    @Column( { nullable: true})
    whichMedications?: string;
    @Column( { nullable: true})
    supplements?: string;
    @Column( { nullable: true})
    familyObesity?: boolean;
    @Column( { nullable: true})
    familyDiabetes?: boolean;
    @Column( { nullable: true})
    familyHta?: boolean;
    @Column( { nullable: true})
    familyCancer?: boolean;
    @Column( { nullable: true})
    familyOther?: string;
    @Column( { nullable: true})
    physicalActivity?: string;
    @Column( { nullable: true})
    exercise?: boolean;
    @Column( { nullable: true})
    exerciseType?: string;
    @Column( { nullable: true})
    exerciseFrequency?: string;
    @Column( { nullable: true})
    exerciseDuration?: string;
    @Column( { nullable: true})
    exerciseSince?: string;
    @Column( { nullable: true})
    alcohol?: string;
    @Column( { nullable: true})
    tobacco?: string;
    @Column( { nullable: true})
    coffee?: string;
    @Column( { nullable: true})
    otherSubstances?: string;
    @Column( { nullable: true})
    generalSigns?: string;
    @Column( { nullable: true})
    mealsPerDay?: number;
    @Column( { nullable: true})
    breakfastTime?: string;
    @Column( { nullable: true})
    lunchTime?: string;
    @Column( { nullable: true})
    dinnerTime?: string;
    @Column( { nullable: true})
    eatsBetweenMeals?: boolean;
    @Column( { nullable: true})
    whatEatsBetweenMeals?: string;
    @Column( { nullable: true})
    whoPreparesFood?: string;
    @Column( { nullable: true})
    appetite?: string;
    @Column( { nullable: true})
    hungryTime?: string;
    @Column( { nullable: true})
    foodDiscomfort?: string;
    @Column( { nullable: true})
    foodAllergy?: boolean;
    @Column( { nullable: true})
    foodAllergySpecific?: string;
    @Column( { nullable: true})
    addsSalt?: boolean;
    @Column( { nullable: true})
    addsSaltReason?: string;
    @Column( { nullable: true})
    cookingFat?: string;
    @Column( { nullable: true})
    nutritionalGuidance?: boolean;
    @Column( { nullable: true})
    nutritionalGuidanceReason?: string;
    @Column( { nullable: true})
    weightLossMedication?: boolean;
    @Column( { nullable: true})
    weightLossMedicationDetails?: string;
    @Column( { nullable: true})
    waterIntake?: number;
    @Column( { default: false})
    isEdit?: boolean;

    @OneToOne(() => User, (user) => user.record)
    user: User;

    @OneToMany(() => NutritionalDiet, nutritionalDiet => nutritionalDiet.record)
    nutritionalDiets: NutritionalDiet[];
}
