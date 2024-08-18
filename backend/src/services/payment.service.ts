import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto, UpdatePaymentDto } from '../dto/payment.dto';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private paymentsRepository: Repository<Payment>,
    ) { }

    async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
        const newPayment = this.paymentsRepository.create(createPaymentDto);
        return this.paymentsRepository.save(newPayment);
    }

    async getAll(): Promise<Payment[]> {
        return this.paymentsRepository.find();
    }

    async get(id: number): Promise<Payment | null> {
        return this.paymentsRepository.findOneBy({ id });
    }

    async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment | null> {
        await this.paymentsRepository.update(id, updatePaymentDto);
        return this.get(id);
    }
}
