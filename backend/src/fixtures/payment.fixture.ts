import { CreatePaymentDto } from "src/dto/payment.dto";
import { Payment } from "src/entities/payment.entity";
import { clientFixture } from "./client.fixture";

export const payments: Payment[] = [
  {
    id: 1,
    status: "Pending",
    client: clientFixture,
    amount: 100,
    recipientName: "Marina",
    recipientBankName: "Another Amazing bank",
    recipientAccountNumber: "123456789",
  },
];

export const createPaymentDto: CreatePaymentDto = {
  clientId: 3,
  amount: 300,
  recipientName: "Marina",
  recipientBankName: "Another Amazing bank",
  recipientAccountNumber: "555555555",
  notes: "Test payment update",
};
