export interface Client {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    bankAccountNumber?: string;
}

export interface Payment {
    id: number;
    client: Client;
    amount: number;
    recipientName: string;
    recipientBankName: string;
    recipientAccountNumber: string;
    notes?: string;
    status: 'Pending' | 'Approved';
}
