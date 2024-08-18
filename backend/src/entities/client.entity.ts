// References:
// TypeORM Entity Docs: https://typeorm.io/entities
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

