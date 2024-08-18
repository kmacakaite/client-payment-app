// References:
// TypeORM Entity Docs: https://typeorm.io/entities
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientId: number;

  @Column()
  amount: number;

  @Column()
  recipientName: string;

  @Column()
  recipientBankName: string;

  @Column()
  recipientAccountNumber: string;

  @Column({ nullable: true })
  notes?: string;

  @Column({ default: 'Pending' })
  status: string;
}
