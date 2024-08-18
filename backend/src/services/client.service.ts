import { Injectable } from '@nestjs/common';
import { CreateClientDto, UpdateClientDto } from '../client/client.dto';
import { Client } from '../client/client.interface';

@Injectable()
export class ClientService {
    private clients: Client[] = []; // In-memory storage for simplicity, change once connecting postgres

    create(createClientDto: CreateClientDto): Client {
        const newClient: Client = { id: Date.now(), ...createClientDto };
        this.clients.push(newClient);
        return newClient;
    }

    getAll(): Client[] {
        return this.clients;
    }

    get(id: number): Client | undefined {
        return this.clients.find(client => client.id === id);
    }

    update(id: number, updateClientDto: UpdateClientDto): Client | null {
        const clientIndex = this.clients.findIndex(client => client.id === id);
        if (clientIndex === -1) return null;
        this.clients[clientIndex] = { ...this.clients[clientIndex], ...updateClientDto };
        return this.clients[clientIndex];
    }
}

// References:
// Services and Providers: https://docs.nestjs.com/providers
