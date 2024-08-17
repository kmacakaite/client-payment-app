export interface Payment {
    id: number;
    clientId: number;
    amount: number;
    recipientName: string;
    recipientBankName: string;
    recipientAccountNumber: string;
    notes?: string;
    status: string;
}