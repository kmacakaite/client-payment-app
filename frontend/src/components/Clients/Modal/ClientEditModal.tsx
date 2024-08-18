import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Client } from '../../../types';

interface ClientEditModalProps {
    open: boolean;
    client: Client | null;
    onClose: () => void;
    onSave: (clientData: Client) => void;
}

const ClientEditModal: React.FC<ClientEditModalProps> = ({ open, client, onClose, onSave }) => {
    const [formData, setFormData] = useState<Client | null>(client);

    useEffect(() => {
        setFormData(client);
    }, [client]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => prev ? { ...prev, [name]: value } : null);
    };

    const handleSubmit = () => {
        if (formData) {
            onSave(formData);
            onClose();
        }
    };

    const fields = [
        { name: 'name', label: 'Name' },
        { name: 'address', label: 'Address' },
        { name: 'phoneNumber', label: 'Phone Number' },
        { name: 'bankAccountNumber', label: 'Bank Account Number' }
    ];

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Client</DialogTitle>
            <DialogContent>
                {formData && (
                    <>
                        {fields.map((field) => (
                            <FormTextField
                                key={field.name}
                                name={field.name}
                                label={field.label}
                                value={(formData as any)[field.name] || ''}
                                onChange={handleChange}
                            />
                        ))}
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ClientEditModal;

interface FormTextFieldProps {
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fullWidth?: boolean;
}

const FormTextField: React.FC<FormTextFieldProps> = ({ name, label, value, onChange, fullWidth = true }) => {
    return (
        <TextField
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            fullWidth={fullWidth}
            margin="normal"
        />
    );
};
