import { SelectChangeEvent } from '@mui/material';
import { Client } from '../../../types';
export interface CreatePaymentDto {
    clientId: number;
    amount: number;
    recipientName: string;
    recipientBankName: string;
    recipientAccountNumber: string;
    notes?: string;
}

export const getPaymentFormFields = (
    formData: CreatePaymentDto,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleClientChange: (e: SelectChangeEvent<number | string>) => void,
    clients: Client[]
) => [
        {
            name: 'clientId',
            label: 'Client',
            value: formData.clientId,
            onSelect: handleClientChange,
            options: clients.map(client => ({ value: client.id, label: client.name })),
            required: true,
            validation: {
                message: 'Client selection is required',
                validationFormat: '^\\d+$'
            }
        },
        {
            name: 'amount',
            label: 'Amount',
            value: formData.amount,
            onChange: handleChange,
            type: 'number',
            required: true,
            validation: {
                message: 'Amount must be greater than 0',
                validationFormat: '^[1-9]\\d*$'
            }
        },
        {
            name: 'recipientName',
            label: 'Recipient Name',
            value: formData.recipientName,
            onChange: handleChange,
            required: true,
            validation: {
                message: 'Recipient Name is required',
                validationFormat: '^(?!\\s*$).+'
            }
        },
        {
            name: 'recipientBankName',
            label: 'Recipient Bank Name',
            value: formData.recipientBankName,
            onChange: handleChange,
            required: true,
            validation: {
                message: 'Recipient Bank Name is required',
                validationFormat: '^(?!\\s*$).+'
            }
        },
        {
            name: 'recipientAccountNumber',
            label: 'Recipient Account Number',
            value: formData.recipientAccountNumber,
            onChange: handleChange,
            required: true,
            validation: {
                message: 'Recipient Account Number is required',
                validationFormat: '^(?!\\s*$).+'
            }
        },
        {
            name: 'notes',
            label: 'Notes (Optional)',
            value: formData.notes || '',
            onChange: handleChange
        }
    ];
