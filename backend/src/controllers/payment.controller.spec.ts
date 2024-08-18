import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePaymentDto } from '../dto/payment.dto';
import { Payment } from '../entities/payment.entity';
import { clientFixture } from '../fixtures/client.fixture';
import { createPaymentDto, payments } from '../fixtures/payment.fixture';
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
            const result: Payment = { id: 1, status: 'Pending', client: clientFixture, ...createPaymentDto };

            jest.spyOn(paymentService, 'create').mockResolvedValue(result);

            expect(await paymentController.create(createPaymentDto)).toBe(result);
            expect(paymentService.create).toHaveBeenCalledWith(createPaymentDto);
        });
    });

    describe('getAll', () => {
        it('should return all payments', async () => {
            jest.spyOn(paymentService, 'getAll').mockResolvedValue(payments);

            expect(await paymentController.getAll()).toBe(payments);
        });
    });

    describe('get', () => {
        it('should return a payment by id', async () => {
            const newPayment: Payment = { id: 1, status: 'Pending', client: clientFixture, ...createPaymentDto };
            jest.spyOn(paymentService, 'get').mockResolvedValue(newPayment);

            expect(await paymentController.get('1')).toBe(newPayment);
        });

        it('should return undefined if payment not found', async () => {
            jest.spyOn(paymentService, 'get').mockResolvedValue(null);

            expect(await paymentController.get('999')).toBeNull();
        });
    });

    describe('update', () => {
        it('should update an existing payment and return it', async () => {


            const newPayment: Payment = { id: 1, status: 'Pending', client: clientFixture, ...createPaymentDto };
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
