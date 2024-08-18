import { Client } from "src/entities/client.entity";

export const clientFixture: Client = {
    id: 1,
    name: 'Client Name',
    address: 'Client Address',
    phoneNumber: '1234567890',
    bankAccountNumber: '9876543210',
    payments: []
};