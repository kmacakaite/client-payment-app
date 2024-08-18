import { CreatePaymentDto, UpdatePaymentDto } from '../payments/payment.dto';
import { Payment } from '../payments/payment.interface';
import { PaymentService } from '../services/payment.service';

describe('PaymentService', () => {
    let paymentService: PaymentService;

    beforeEach(() => {
        paymentService = new PaymentService();
    });

    describe('create', () => {
        it('should create and return a new payment', () => {
            const createPaymentDto: CreatePaymentDto = {
                clientId: 1,
                amount: 100,
                recipientName: 'Marina',
                recipientBankName: 'Another Amazing bank',
                recipientAccountNumber: '123456789',
                notes: 'Payment for services',
            };

            const result = paymentService.create(createPaymentDto);

            // Assert that the result has the expected structure
            expect(result).toHaveProperty('id');
            expect(result).toMatchObject({
                clientId: 1,
                amount: 100,
                recipientName: 'Marina',
                recipientBankName: 'Another Amazing bank',
                recipientAccountNumber: '123456789',
                notes: 'Payment for services',
                status: 'Pending',
            });

            // Check that the payment was added to the payments array
            expect(paymentService.getAll()).toContain(result);
        });
    });

    describe('getAll', () => {
        it('should return all payments', () => {
            const payments: Payment[] = paymentService.getAll();
            expect(payments).toBeInstanceOf(Array);
        });
    });

    describe('get', () => {
        it('should return a payment by id', () => {
            const createPaymentDto: CreatePaymentDto = {
                clientId: 2,
                amount: 200,
                recipientName: 'Jane Doe',
                recipientBankName: 'Bank of Test',
                recipientAccountNumber: '987654321',
                notes: 'Test payment',
            };

            const newPayment = paymentService.create(createPaymentDto);

            const foundPayment = paymentService.get(newPayment.id);

            expect(foundPayment).toEqual(newPayment);
        });

        it('should return undefined if payment not found', () => {
            const payment = paymentService.get(999);
            expect(payment).toBeUndefined();
        });
    });

    describe('update', () => {
        it('should update an existing payment and return it', () => {
            const createPaymentDto: CreatePaymentDto = {
                clientId: 3,
                amount: 300,
                recipientName: 'Marina',
                recipientBankName: 'Another Amazing bank',
                recipientAccountNumber: '555555555',
                notes: 'Test payment update',
            };

            const newPayment = paymentService.create(createPaymentDto);

            const updatePaymentDto: UpdatePaymentDto = {
                status: 'Approved',
            };

            const updatedPayment = paymentService.update(newPayment.id, updatePaymentDto);

            expect(updatedPayment).toEqual({
                ...newPayment,
                status: 'Approved',
            });
        });

        it('should return null if payment to update is not found', () => {
            const updatePaymentDto: UpdatePaymentDto = { status: 'Failed' };
            const updatedPayment = paymentService.update(999, updatePaymentDto);

            expect(updatedPayment).toBeNull();
        });
    });
});
