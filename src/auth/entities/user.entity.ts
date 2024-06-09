import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @Column('text', { default:['patient'] })
    roles: string;


    @BeforeInsert()
    checkFieldsBeforeInser() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.email = this.email.toLowerCase().trim();
    }
}