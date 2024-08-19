// frontend/src/components/Payments/List/PaymentsList.tsx
import { Button } from '@mui/material';
import React from 'react';
import { Payment } from '../../../types';
import { ColumnConfig, CustomTable } from '../../CustomTable/CustomTable';

interface PaymentListProps {
  payments: Payment[];
  onApprove: (payment: Payment) => void;
}

const PaymentsList: React.FC<PaymentListProps> = ({ payments, onApprove }) => {
  // Define column configurations
  const columns: ColumnConfig<Payment>[] = [
    { header: 'Client', render: payment => payment.client?.name || 'N/A' }, 
    { header: 'Amount', field: 'amount' }, 
    { header: "Recipient's Name", field: 'recipientName' }, 
    { header: "Recipient's Bank Name", field: 'recipientBankName' }, 
    { header: "Recipient's Account Number", field: 'recipientAccountNumber' }, 
    { header: 'Status', field: 'status' }, 
    {
      header: 'Actions',
      render: payment => payment.status === 'Pending' ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => onApprove(payment)}
        >
          Approve
        </Button>
      ) : null
    }
  ];

  return (
    <CustomTable
      columns={columns}
      items={payments}
    />
  );
};

export default PaymentsList;
