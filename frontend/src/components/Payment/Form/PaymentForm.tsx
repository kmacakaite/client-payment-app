import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { DEFAULT_PAYMENT_FORM_DATA } from '../../../lib/constants';
import { Client } from '../../../types';
import { CustomForm } from '../../CustomForm/CustomForm';
import { CreatePaymentDto, getPaymentFormFields } from './getPaymentFormFields';

interface PaymentFormProps {
  clients: Client[];
  onSave: (paymentData: CreatePaymentDto) => void;
}

export const PaymentForm = ({ clients, onSave }: PaymentFormProps) => {
  const [formData, setFormData] = useState<CreatePaymentDto>(
    DEFAULT_PAYMENT_FORM_DATA,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClientChange = (e: SelectChangeEvent<number | string>) => {
    const selectedClientId = Number(e.target.value);
    setFormData((prev) => ({ ...prev, clientId: selectedClientId }));
  };

  const handleSubmit = () => {
    onSave(formData);
    setFormData(DEFAULT_PAYMENT_FORM_DATA);
  };

  const fields = getPaymentFormFields(
    formData,
    handleChange,
    handleClientChange,
    clients,
  );

  return <CustomForm fields={fields} onSubmit={handleSubmit} />;
};
