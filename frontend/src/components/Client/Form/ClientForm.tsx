import React, { useState } from 'react';
import { Client } from '../../../types';
import { CustomForm } from '../../CustomForm/CustomForm';
import { getClientFormFields } from './getClientFormFields';
import { DEFAULT_CLIENT_FORM_DATA } from '../../../utils/constants';

interface ClientFormProps {
    onSave: (clientData: Omit<Client, 'id'>) => void;
}

export const ClientForm: React.FC<ClientFormProps> = ({ onSave }) => {
    const [formData, setFormData] = useState<Omit<Client, 'id'>>(DEFAULT_CLIENT_FORM_DATA);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSave(formData);
        setFormData(DEFAULT_CLIENT_FORM_DATA);
    };

    const fields = getClientFormFields(formData, handleChange);

    return <CustomForm fields={fields} onSubmit={handleSubmit} />;
};
