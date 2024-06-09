import { User } from "src/auth/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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
}
