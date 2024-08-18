import { Test, TestingModule } from '@nestjs/testing';
import { CreatePaymentDto, UpdatePaymentDto } from '../dto/payment.dto';
import { Payment } from '../entities/payment.entity';
import { PaymentService } from '../services/payment.service';
import { PaymentController } from './payment.controller';

describe('PaymentController', () => {
    let paymentController: PaymentController;
    let paymentService: PaymentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PaymentController],
            providers: [
                {
                    provide: PaymentService,
                    useValue: {
                        create: jest.fn(),
                        getAll: jest.fn(),
                        get: jest.fn(),
                        update: jest.fn(),
                    },
                },
            ],
        }).compile();

        paymentController = module.get<PaymentController>(PaymentController);
        paymentService = module.get<PaymentService>(PaymentService);
    });

    describe('create', () => {
        it('should create and return a new payment', async () => {
            const createPaymentDto: CreatePaymentDto = {
                clientId: 1,
                amount: 100,
                recipientName: 'Marina',
                recipientBankName: 'Another Amazing bank',
                recipientAccountNumber: '123456789',
                notes: 'Payment for services',
            };

            const result: Payment = { id: 1, status: 'Pending', ...createPaymentDto };

            jest.spyOn(paymentService, 'create').mockResolvedValue(result);

            expect(await paymentController.create(createPaymentDto)).toBe(result);
            expect(paymentService.create).toHaveBeenCalledWith(createPaymentDto);
        });
    });

    describe('getAll', () => {
        it('should return all payments', async () => {
            const payments: Payment[] = [{ id: 1, status: 'Pending', clientId: 1, amount: 100, recipientName: 'Marina', recipientBankName: 'Another Amazing bank', recipientAccountNumber: '123456789' }];
            jest.spyOn(paymentService, 'getAll').mockResolvedValue(payments);

            expect(await paymentController.getAll()).toBe(payments);
        });
    });

    describe('get', () => {
        it('should return a payment by id', async () => {
            const createPaymentDto: CreatePaymentDto = {
                clientId: 2,
                amount: 200,
                recipientName: 'Jane Doe',
                recipientBankName: 'Bank of Test',
                recipientAccountNumber: '987654321',
                notes: 'Test payment',
            };

            const newPayment: Payment = { id: 1, status: 'Pending', ...createPaymentDto };
            jest.spyOn(paymentService, 'get').mockResolvedValue(newPayment);

            expect(await paymentController.get('1')).toBe(newPayment);
        });

        it('should return undefined if payment not found', async () => {
            jest.spyOn(paymentService, 'get').mockResolvedValue(null);

            expect(await paymentController.get('999')).toBeUndefined();
        });
    });

    describe('update', () => {
        it('should update an existing payment and return it', async () => {
            const createPaymentDto: CreatePaymentDto = {
                clientId: 3,
                amount: 300,
                recipientName: 'Marina',
                recipientBankName: 'Another Amazing bank',
                recipientAccountNumber: '555555555',
                notes: 'Test payment update',
            };

            const newPayment: Payment = { id: 1, status: 'Pending', ...createPaymentDto };
            const updatePaymentDto: UpdatePaymentDto = { status: 'Approved' };

            jest.spyOn(paymentService, 'update').mockResolvedValue({ ...newPayment, ...updatePaymentDto });

            expect(await paymentController.update('1', updatePaymentDto)).toEqual({ ...newPayment, ...updatePaymentDto });
        });

        it('should return null if payment to update is not found', async () => {
            jest.spyOn(paymentService, 'update').mockResolvedValue(null);

            expect(await paymentController.update('999', { status: 'Failed' })).toBeNull();
        });
    });
});
