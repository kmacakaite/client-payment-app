import { Client } from 'src/entities/client.entity';

export const clientFixture: Client = {
  id: 1,
  name: 'Client Name',
  address: 'Client Address',
  phoneNumber: '1234567890',
  bankAccountNumber: 554564564,
  payments: [],
};
