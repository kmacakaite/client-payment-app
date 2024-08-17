import { Module } from '@nestjs/common';
import { ClientController } from './client/client.controller';
import { ClientService } from './client/client.service';
import { PaymentsController } from './payments/payment.controller';
import { PaymentService } from './payments/payment.service';

@Module({
  imports: [],
  controllers: [ClientController, PaymentsController],
  providers: [ClientService, PaymentService],
})
export class AppModule { }
