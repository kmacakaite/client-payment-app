// Controllers: https://docs.nestjs.com/controllers
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard"; // Import the guard
import { CreatePaymentDto, UpdatePaymentDto } from "../dto/payment.dto";
import { PaymentService } from "../services/payment.service";

@Controller("payments")
@UseGuards(AuthGuard) // Apply the guard to secure the endpoints
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  getAll() {
    return this.paymentService.getAll();
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.paymentService.get(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }
}
