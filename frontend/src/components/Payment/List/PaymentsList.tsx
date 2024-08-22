import { Button } from '@mui/material';
import { Payment } from '../../../types';
import { ColumnConfig, CustomTable } from '../../CustomTable/CustomTable';

interface PaymentListProps {
  payments: Payment[];
  onApprove: (payment: Payment) => void;
}

export const PaymentsList = ({ payments, onApprove }: PaymentListProps) => {
  const columns: ColumnConfig<Payment>[] = [
    { header: 'Client', render: (payment) => payment.client?.name || 'N/A' },
    { header: 'Amount', field: 'amount' },
    { header: "Recipient's Name", field: 'recipientName' },
    { header: "Recipient's Bank Name", field: 'recipientBankName' },
    { header: "Recipient's Account Number", field: 'recipientAccountNumber' },
    { header: 'Status', field: 'status' },
    {
      header: 'Actions',
      render: (payment) =>
        payment.status === 'Pending' ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => onApprove(payment)}
          >
            Approve
          </Button>
        ) : null,
    },
  ];

  return <CustomTable columns={columns} items={payments} />;
};
