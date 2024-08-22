import { Button } from '@mui/material';
import { Client } from '../../../types';
import { ColumnConfig, CustomTable } from '../../CustomTable/CustomTable';

interface ClientListProps {
  clients: Client[];
  onEdit: (client: Client) => void;
}

export const ClientList = ({ clients, onEdit }: ClientListProps) => {
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
      ),
    },
  ];

  return <CustomTable columns={columns} items={clients} />;
};
