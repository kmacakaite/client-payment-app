import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { createClient, fetchClients, updateClient } from '../api/api';
import { ClientForm } from '../components/Client/Form/ClientForm';
import { ClientList } from '../components/Client/List/ClientsList';
import { ClientEditModal } from '../components/Client/Modal/ClientEditModal';
import { Client } from '../types';

// This component contains all business logic for client
export const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const loadClients = async () => {
    try {
      const response = await fetchClients();
      setClients(response.data);
    } catch (error) {
      console.error('Failed to fetch clients', error);
    }
  };

  const handleCreateClient = async (clientData: Omit<Client, 'id'>) => {
    try {
      await createClient(clientData);
      loadClients();
    } catch (error) {
      console.error('Failed to create client', error);
    }
  };
  const handleUpdateClient = async (clientData: Client) => {
    try {
      await updateClient(clientData.id, clientData);
      loadClients();
    } catch (error) {
      console.error('Failed to save client', error);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <div>
      <h1>Clients</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ClientForm onSave={handleCreateClient} />
        </Grid>
        <Grid item xs={12}>
          <ClientList
            clients={clients}
            onEdit={(client: Client) => {
              setEditingClient(client);
              setEditModalOpen(true);
            }}
          />
        </Grid>
      </Grid>
      {editingClient && (
        <ClientEditModal
          open={isEditModalOpen}
          client={editingClient}
          onSave={handleUpdateClient}
          onClose={() => {
            setEditModalOpen(false);
            setEditingClient(null);
          }}
        />
      )}
    </div>
  );
};
