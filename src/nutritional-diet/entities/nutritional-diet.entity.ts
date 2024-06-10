import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Record } from '../../records/entities/record.entity';

@Entity()
export class NutritionalDiet {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('text')
  secureName: string;

  @Column('date')
  from: Date;

  @Column('date')
  to: Date;

  @ManyToOne(() => Record, (record) => record.nutritionalDiets)
  record: Record;

}
