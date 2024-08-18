// frontend/src/components/Clients/ClientForm.tsx
import React, { useState } from 'react';
import { Client } from '../../../types';
import { CustomForm } from '../../CustomForm/CustomForm';

interface ClientFormProps {
    client?: Client;
    onSave: (clientData: Client) => void;
}

export const ClientForm: React.FC<ClientFormProps> = ({ client, onSave }) => {
    const [formData, setFormData] = useState<Client>(client || {
        id: 0,
        name: '',
        address: '',
        phoneNumber: '',
        bankAccountNumber: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSave(formData);
        setFormData({
            id: 0,
            name: '',
            address: '',
            phoneNumber: '',
            bankAccountNumber: '',
        });
    };

    const fields = [
        {
            name: 'name',
            label: 'Name',
            value: formData.name,
            onChange: handleChange,
            required: true,
        },
        {
            name: 'address',
            label: 'Address',
            value: formData.address,
            onChange: handleChange,
            required: true,
        },
        {
            name: 'phoneNumber',
            label: 'Phone Number',
            value: formData.phoneNumber,
            onChange: handleChange,
            required: true,
            validation: {
                message: 'Phone number must be 11 digits',
                validationFormat: '^\\d{11}$'
            }
        },
        {
            name: 'bankAccountNumber',
            label: 'Bank Account Number (Optional)',
            value: formData.bankAccountNumber || '',
            onChange: handleChange,
        },
    ];

    return <CustomForm fields={fields} onSubmit={handleSubmit} />;
};
