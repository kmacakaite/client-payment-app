export class CreatePaymentDto {
    readonly clientId: number;
    readonly amount: number;
    readonly recipientName: string;
    readonly recipientBankName: string;
    readonly recipientAccountNumber: string;
    readonly notes?: string;
}

export class UpdatePaymentDto {
    readonly status: string;
}