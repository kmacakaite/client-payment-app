import { Button } from '@mui/material';
import React from 'react';
import { Client } from '../../../types';
import { ColumnConfig, CustomTable } from '../../CustomTable/CustomTable';

interface ClientListProps {
  clients: Client[];
  onEdit: (client: Client) => void;
}

const ClientList: React.FC<ClientListProps> = ({ clients, onEdit }) => {
  const columns: ColumnConfig<Client>[] = [
    { header: 'Name', field: 'name' },
    { header: 'Address', field: 'address' },
    { header: 'Phone Number', field: 'phoneNumber' },
    { header: 'Bank Account Number', field: 'bankAccountNumber' },
    {
      header: 'Actions',
      render: (client: Client) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => onEdit(client)}
        >
          Edit
        </Button>
      )
    }
  ];

  return (
    <CustomTable
      columns={columns}
      items={clients}
    />
  );
};

export default ClientList;
