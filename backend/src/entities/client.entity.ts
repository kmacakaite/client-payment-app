import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Payment } from './payment.entity'; // Use type reference

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    phoneNumber: string;

    @Column({ nullable: true })
    bankAccountNumber?: string;

    @OneToMany(() => Payment, (payment) => payment.client)
    payments: Relation<Payment[]>;
}
