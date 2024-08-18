import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from '../controllers/client.controller';
import { Client } from '../entities/client.entity';
import { ClientService } from '../services/client.service';

@Module({
    imports: [TypeOrmModule.forFeature([Client])],
    providers: [ClientService],
    controllers: [ClientController],
})
export class ClientsModule { }
