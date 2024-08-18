import { Injectable } from '@nestjs/common';
import { CreatePaymentDto, UpdatePaymentDto } from '../payments/payment.dto';
import { Payment } from '../payments/payment.interface';

@Injectable()
export class PaymentService {
    private payments: Payment[] = []; // In-memory storage for simplicity

    create(createPaymentDto: CreatePaymentDto): Payment {
        const newPayment: Payment = { id: Date.now(), status: 'Pending', ...createPaymentDto };
        this.payments.push(newPayment);
        return newPayment;
    }

    getAll(): Payment[] {
        return this.payments;
    }

    get(id: number): Payment | undefined {
        return this.payments.find(payment => payment.id === id);
    }

    update(id: number, updatePaymentDto: UpdatePaymentDto): Payment | null {
        const paymentIndex = this.payments.findIndex(payment => payment.id === id);
        if (paymentIndex === -1) return null;
        this.payments[paymentIndex] = { ...this.payments[paymentIndex], ...updatePaymentDto };
        return this.payments[paymentIndex];
    }
}
