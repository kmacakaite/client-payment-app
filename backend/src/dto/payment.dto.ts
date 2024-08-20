import { IsNotEmpty } from 'class-validator';
export class CreatePaymentDto {
  @IsNotEmpty()
  clientId: number;
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  recipientName: string;
  @IsNotEmpty()
  recipientBankName: string;
  @IsNotEmpty()
  recipientAccountNumber: string;
  notes?: string;
}

export class UpdatePaymentDto {
  @IsNotEmpty()
  status: string;
}
