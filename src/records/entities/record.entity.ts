import { User } from "src/auth/entities/user.entity";
import { NutritionalDiet } from "src/nutritional-diet/entities/nutritional-diet.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('records')
export class Record {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('date')
    startDate: Date;

    @Column('numeric')
    startWeigth: number;

    @OneToOne(() => User, (user) => user.record)
    user: User;

    @OneToMany(() => NutritionalDiet, nutritionalDiet => nutritionalDiet.record)
    nutritionalDiets: NutritionalDiet[];
}
