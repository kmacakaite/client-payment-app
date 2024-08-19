import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from './config';
import { ClientController } from './controllers/client.controller';
import { PaymentController } from './controllers/payment.controller';
import { Client } from './entities/client.entity';
import { Payment } from './entities/payment.entity';
import { ClientService } from './services/client.service';
import { PaymentService } from './services/payment.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: DB_PORT ?? 5432,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: [Client, Payment],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Client, Payment]),
    AuthModule,
  ],
  controllers: [ClientController, PaymentController],
  providers: [ClientService, PaymentService],
})
export class AppModule { }
