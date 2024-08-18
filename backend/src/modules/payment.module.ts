import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from '../controllers/payment.controller';
import { Payment } from '../entities/payment.entity';
import { PaymentService } from '../services/payment.service';

@Module({
    imports: [TypeOrmModule.forFeature([Payment])],
    providers: [PaymentService],
    controllers: [PaymentController],
})
export class PaymentModule { }
