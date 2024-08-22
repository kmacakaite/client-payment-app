import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { ChangeEvent } from 'react';

interface FormFieldComponentProps {
  name: string;
  label: string;
  value: string | number | undefined;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (e: SelectChangeEvent<number | string>) => void;
  type?: string;
  error?: string;
  options?: { value: string | number; label: string }[];
  required?: boolean;
}

export const FormFieldComponent = ({
  name,
  label,
  value,
  onChange,
  onSelect,
  error,
  options = [],
  required = false,
}: FormFieldComponentProps) => {
  const renderTextField = () => (
    <TextField
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      required={required}
    />
  );

  const renderSelect = () => (
    <>
      <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-select-label`}
        id={name}
        value={typeof value === 'number' ? value : ''}
        onChange={onSelect}
        label={label}
        fullWidth
        required={required}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );

  return (
    <FormControl fullWidth error={!!error}>
      {options.length ? renderSelect() : renderTextField()}
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
