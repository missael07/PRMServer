import { Record } from "src/records/entities/record.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true })
    email: string;

    @Column('text', { select: false})
    password: string;

    @Column('text')
    fullName: string;

    @Column('boolean', { default: true})
    isActive: boolean;

    @Column('text', { default:'patient' })
    roles: string;

    @Column('text', { nullable: true})
    age: string;
    @Column('text', { nullable: true})
    gender: string;

    @OneToOne(() => Record, (record) => record.user, { cascade: true })
    @JoinColumn()
    record: Record;


    @BeforeInsert()
    checkFieldsBeforeInser() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.email = this.email.toLowerCase().trim();
    }
}