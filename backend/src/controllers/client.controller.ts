// Controllers: https://docs.nestjs.com/controllers
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateClientDto, UpdateClientDto } from '../dto/client.dto';
import { ClientService } from '../services/client.service';

@Controller('client')
@UseGuards(AuthGuard) // Apply the guard to secure the endpoints
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
