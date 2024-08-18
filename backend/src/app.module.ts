import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'mydatabase',
            entities: [Client, Payment],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Client, Payment]),
    ],
    controllers: [ClientController, PaymentController],
    providers: [ClientService, PaymentService],
})
export class AppModule { }
