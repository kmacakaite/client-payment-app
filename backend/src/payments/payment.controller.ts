// Controllers: https://docs.nestjs.com/controllers
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePaymentDto, UpdatePaymentDto } from './payment.dto';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentService) { }

    @Post()
    create(@Body() createPaymentDto: CreatePaymentDto) {
        return this.paymentsService.create(createPaymentDto);
    }

    @Get()
    getAll() {
        return this.paymentsService.getAll();
    }

    @Get(':id')
    get(@Param('id') id: string) {
        return this.paymentsService.get(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
        return this.paymentsService.update(+id, updatePaymentDto);
    }
}
