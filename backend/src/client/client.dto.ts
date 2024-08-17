// https://docs.nestjs.com/controllers#request-payloads

// Separating logic for creation and updating individual fields
export class CreateClientDto {
    readonly name: string;
    readonly address: string;
    readonly phoneNumber: string;
    readonly bankAccountNumber?: string;
}

export class UpdateClientDto {
    readonly name?: string;
    readonly address?: string;
    readonly phoneNumber?: string;
    readonly bankAccountNumber?: string;
}