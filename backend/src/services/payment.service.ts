// References:
// Services and Providers: https://docs.nestjs.com/providers
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto, UpdatePaymentDto } from '../dto/payment.dto';
import { Client } from '../entities/client.entity';
import { Payment } from '../entities/payment.entity';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
    ) { }

    async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
        const { clientId, ...paymentData } = createPaymentDto;

        // Validate if the client exists
        const client = await this.clientRepository.findOneBy({ id: clientId });
        if (!client) {
            throw new NotFoundException(`Client with ID ${clientId} not found`);
        }

        const payment = this.paymentRepository.create({
            ...paymentData,
            client,
        });

        return this.paymentRepository.save(payment);
    }

    async getAll(): Promise<Payment[] | []> {
        return this.paymentRepository.find({ relations: ['client'] }) ?? []
    }

    async get(id: number): Promise<Payment | null> {
        const payment = await this.paymentRepository.findOne({
            where: { id },
            relations: ['client'],
        });
        if (!payment) {
            throw new NotFoundException(`Payment with ID ${id} not found`);
        }
        return payment;
    }

    async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment | null> {
        const payment = await this.paymentRepository.preload({
            id,
            ...updatePaymentDto,
        });

        if (!payment) {
            throw new NotFoundException(`Payment with ID ${id} not found`);
        }

        return this.paymentRepository.save(payment)
    }
}
