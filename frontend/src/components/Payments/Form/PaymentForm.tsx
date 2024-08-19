// frontend/src/components/Payments/PaymentForm.tsx
import { SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';
import { Client } from '../../../types';
import { CustomForm } from '../../CustomForm/CustomForm';

// Define the DTO for payment
interface CreatePaymentDto {
    clientId: number;
    amount: number;
    recipientName: string;
    recipientBankName: string;
    recipientAccountNumber: string;
    notes?: string;
}

interface PaymentFormProps {
    clients: Client[];
    onSave: (paymentData: CreatePaymentDto) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ clients, onSave }) => {
    const [formData, setFormData] = useState<CreatePaymentDto>({
        clientId: 0,
        amount: 0,
        recipientName: '',
        recipientBankName: '',
        recipientAccountNumber: '',
        notes: '',
    });

    // Handle changes for text inputs and selects
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Adjust the type of event to match what CustomForm expects
    const handleClientChange = (e: SelectChangeEvent<number | string>) => {
        const selectedClientId = Number(e.target.value);
        setFormData(prev => ({
            ...prev,
            clientId: selectedClientId,
        }));
    };

    // Define the fields for CustomForm with validation
    const fields = [
        {
            name: 'clientId',
            label: 'Client',
            value: formData.clientId,
            onSelect: handleClientChange,
            options: clients.map(client => ({ value: client.id, label: client.name })),
            required: true,
            validation: {
                message: 'Client selection is required',
                validationFormat: '^\\d+$' // Ensure it's a number
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
                validationFormat: '^[1-9]\\d*$' // Ensure it's a positive integer
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
                validationFormat: '^(?!\\s*$).+' // Ensure it's not empty or just spaces
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
                validationFormat: '^(?!\\s*$).+' // Ensure it's not empty or just spaces
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
                validationFormat: '^(?!\\s*$).+' // Ensure it's not empty or just spaces
            }
        },
        {
            name: 'notes',
            label: 'Notes (Optional)',
            value: formData.notes || '',
            onChange: handleChange
        },
    ];

    const handleSubmit = () => {
        onSave(formData);
        setFormData({
            clientId: 0,
            amount: 0,
            recipientName: '',
            recipientBankName: '',
            recipientAccountNumber: '',
            notes: '',
        })
    };

    return (
        <CustomForm fields={fields} onSubmit={handleSubmit} />
    );
};

export default PaymentForm;
