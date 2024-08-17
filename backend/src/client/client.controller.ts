// Controllers: https://docs.nestjs.com/controllers
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateClientDto, UpdateClientDto } from './client.dto';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
    constructor(private readonly clientsService: ClientService) { }

    @Post()
    create(@Body() createClientDto: CreateClientDto) {
        return this.clientsService.create(createClientDto);
    }

    @Get()
    getAll() {
        return this.clientsService.getAll();
    }

    @Get(':id')
    get(@Param('id') id: string) {
        return this.clientsService.get(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
        return this.clientsService.update(+id, updateClientDto);
    }
}
