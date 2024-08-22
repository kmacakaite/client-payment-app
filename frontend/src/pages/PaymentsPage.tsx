import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  createPayment,
  fetchClients,
  fetchPayments,
  updatePayment,
} from '../api/api';
import { PaymentForm } from '../components/Payment/Form/PaymentForm';
import { PaymentsList } from '../components/Payment/List/PaymentsList';
import { ConfirmationModal } from '../components/Payment/Modal/ApprovalConfirmationModal';
import { Client, Payment } from '../types';

interface CreatePaymentDto {
  clientId: number;
  amount: number;
  recipientName: string;
  recipientBankName: string;
  recipientAccountNumber: string;
  notes?: string;
}

// This component contains all business logic for payments
export const PaymentsPage = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetches and updates payment data
  const loadPayments = async () => {
    try {
      const response = await fetchPayments();
      setPayments(response.data);
    } catch (error) {
      console.error('Failed to fetch payments', error);
    }
  };

  const loadClients = async () => {
    try {
      const response = await fetchClients();
      setClients(response.data);
    } catch (error) {
      console.error('Failed to fetch clients', error);
    }
  };

  const handleSavePayment = async (paymentData: CreatePaymentDto) => {
    try {
      await createPayment(paymentData);
      // Trigger a refresh of the payments list
      setRefreshFlag((prev) => !prev);
    } catch (error) {
      console.error('Failed to create payment', error);
    }
  };

  // Opens the approval modal for a selected payment
  const handleApprovePayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const confirmApprovePayment = async () => {
    if (selectedPayment) {
      try {
        await updatePayment(selectedPayment.id, {
          ...selectedPayment,
          status: 'Approved',
        });
        setRefreshFlag((prev) => !prev);
      } catch (error) {
        console.error('Failed to approve payment', error);
      }
    }
  };

  // refresh data after each action create/update
  useEffect(() => {
    loadPayments();
    loadClients();
  }, [refreshFlag]);

  return (
    <div>
      <h1>Payments</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PaymentForm clients={clients} onSave={handleSavePayment} />
        </Grid>
        <Grid item xs={12}>
          <PaymentsList payments={payments} onApprove={handleApprovePayment} />
        </Grid>
      </Grid>
      <ConfirmationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmApprovePayment}
        message="Are you sure you want to approve this payment?"
      />
    </div>
  );
};
