import { ChangeEvent, useState } from 'react';
import { DEFAULT_CLIENT_FORM_DATA } from '../../../lib/constants';
import { Client } from '../../../types';
import { CustomForm } from '../../CustomForm/CustomForm';
import { getClientFormFields } from './getClientFormFields';

interface ClientFormProps {
  onSave: (clientData: Omit<Client, 'id'>) => void;
}

export const ClientForm = ({ onSave }: ClientFormProps) => {
  const [formData, setFormData] = useState<Omit<Client, 'id'>>(
    DEFAULT_CLIENT_FORM_DATA,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    setFormData(DEFAULT_CLIENT_FORM_DATA);
  };

  const fields = getClientFormFields(formData, handleChange);

  return <CustomForm fields={fields} onSubmit={handleSubmit} />;
};
