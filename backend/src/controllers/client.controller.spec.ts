import { Test, TestingModule } from '@nestjs/testing';
import { CreateClientDto, UpdateClientDto } from '../dto/client.dto';
import { Client } from '../entities/client.entity';
import { ClientService } from '../services/client.service';
import { ClientController } from './client.controller';

describe('ClientController', () => {
    let clientController: ClientController;
    let clientService: ClientService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ClientController],
            providers: [
                {
                    provide: ClientService,
                    useValue: {
                        create: jest.fn(),
                        getAll: jest.fn(),
                        get: jest.fn(),
                        update: jest.fn(),
                    },
                },
            ],
        }).compile();

        clientController = module.get<ClientController>(ClientController);
        clientService = module.get<ClientService>(ClientService);
    });

    describe('create', () => {
        it('should create a client', async () => {
            const createClientDto: CreateClientDto = { name: 'Karina Ma', address: '123 Street', phoneNumber: '1234567890' };
            const result: Client = { id: 1, ...createClientDto };

            jest.spyOn(clientService, 'create').mockResolvedValue(result);

            expect(await clientController.create(createClientDto)).toBe(result);
            expect(clientService.create).toHaveBeenCalledWith(createClientDto);
        });
    });

    describe('get all clients', () => {
        it('should return an array of clients', async () => {
            const result: Client[] = [{ id: 1, name: 'Karina Ma', address: '123 Street', phoneNumber: '1234567890' }];
            jest.spyOn(clientService, 'getAll').mockResolvedValue(result);

            expect(await clientController.getAll()).toBe(result);
        });
    });

    describe('get client', () => {
        it('should return a single client by ID', async () => {
            const result: Client = { id: 1, name: 'Karina Ma', address: '123 Street', phoneNumber: '1234567890' };
            jest.spyOn(clientService, 'get').mockResolvedValue(result);

            expect(await clientController.get('1')).toBe(result);
        });
    });

    describe('update', () => {
        it('should update a client by ID', async () => {
            const updateClientDto: UpdateClientDto = { name: 'Karina Ma' };
            const result: Client = { id: 1, name: 'Karina Ma', address: '123 Street', phoneNumber: '1234567890' };

            jest.spyOn(clientService, 'update').mockResolvedValue(result);

            expect(await clientController.update('1', updateClientDto)).toBe(result);
            expect(clientService.update).toHaveBeenCalledWith(1, updateClientDto);
        });
    });
});