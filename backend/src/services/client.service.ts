// References:
// Services and Providers: https://docs.nestjs.com/providers
import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.clientsRepository.save(createClientDto);
  }

  async getAll(): Promise<Client[] | []> {
    return this.clientsRepository.find() ?? [];
  }

  async get(id: number): Promise<Client | null> {
    const client = await this.clientsRepository.findOneBy({ id });
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client;
  }

  async update(
    id: number,
    updateClientDto: UpdateClientDto,
  ): Promise<Client | null> {
    const client = await this.clientsRepository.preload({
      id,
      ...updateClientDto,
    });

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    return this.clientsRepository.save(client);
  }
}
