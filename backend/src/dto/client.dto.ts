// https://docs.nestjs.com/controllers#request-payloads

// Separating logic for creation and updating individual fields
export class CreateClientDto {
    name: string;
    address: string;
    phoneNumber: string;
    bankAccountNumber?: string;
}

export class UpdateClientDto {
    name?: string;
    address?: string;
    phoneNumber?: string;
    bankAccountNumber?: string;
}