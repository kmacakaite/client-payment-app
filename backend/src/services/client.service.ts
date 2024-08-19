// References:
// Services and Providers: https://docs.nestjs.com/providers
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto, UpdateClientDto } from '../dto/client.dto';
import { Client } from '../entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const newClient = this.clientsRepository.create(createClientDto);
    return this.clientsRepository.save(newClient);
  }

  async getAll(): Promise<Client[] | []> {
    return this.clientsRepository.find() ?? [];
  }

  async get(id: number): Promise<Client | null> {
    return this.clientsRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateClientDto: UpdateClientDto,
  ): Promise<Client | null> {
    await this.clientsRepository.update(id, updateClientDto);
    return this.get(id);
  }
}
