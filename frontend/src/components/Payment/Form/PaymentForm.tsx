import { SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';
import { Client } from '../../../types';
import { DEFAULT_PAYMENT_FORM_DATA } from '../../../utils/constants';
import { CustomForm } from '../../CustomForm/CustomForm';
import { CreatePaymentDto, getPaymentFormFields } from './getPaymentFormFields';

interface PaymentFormProps {
    clients: Client[];
    onSave: (paymentData: CreatePaymentDto) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ clients, onSave }) => {
    const [formData, setFormData] = useState<CreatePaymentDto>(DEFAULT_PAYMENT_FORM_DATA);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleClientChange = (e: SelectChangeEvent<number | string>) => {
        const selectedClientId = Number(e.target.value);
        setFormData(prev => ({ ...prev, clientId: selectedClientId }));
    };

    const handleSubmit = () => {
        onSave(formData);
        setFormData(DEFAULT_PAYMENT_FORM_DATA);
    };

    const fields = getPaymentFormFields(formData, handleChange, handleClientChange, clients);

    return <CustomForm fields={fields} onSubmit={handleSubmit} />;
};
