import { Button, Grid, SelectChangeEvent } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { FormFieldComponent } from './FormField';

interface FormField {
  name: string;
  label: string;
  value: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (e: SelectChangeEvent<number | string>) => void;
  error?: string;
  options?: { value: number; label: string }[];
  required?: boolean;
  validation?: { message: string; validationFormat: string }; // Format: regex pattern as a string
}

interface FormProps {
  fields: FormField[];
  onSubmit: () => void;
}

export const CustomForm = ({ fields, onSubmit }: FormProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateFields = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    fields.forEach((field) => {
      if (field.required && !field.value) {
        newErrors[field.name] = 'This field is required';
      } else if (field.validation) {
        const regex = new RegExp(field.validation.validationFormat);
        if (!regex.test(String(field.value))) {
          newErrors[field.name] = field.validation.message;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      onSubmit();
    }
  };

  return (
    <Grid container spacing={2}>
      {fields.map((field, index) => (
        <Grid item xs={12} key={index}>
          <FormFieldComponent
            name={field.name}
            label={field.label}
            value={field.value}
            onChange={field.onChange}
            onSelect={field.onSelect}
            error={errors[field.name]}
            options={field.options}
            required={field.required}
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button onClick={handleSubmit} variant="contained">
          Create
        </Button>
      </Grid>
    </Grid>
  );
};
