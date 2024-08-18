import React, { useEffect, useState } from 'react';
import { createClient, fetchClients, updateClient } from '../api/api';
import { ClientForm } from '../components/Clients/Form/ClientForm';
import ClientList from '../components/Clients/List/ClientsList';
import ClientEditModal from '../components/Clients/Modal/ClientEditModal';
import { Client } from '../types';

// This component contains all business logic
export const ClientsPage: React.FC = () => {
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

    const handleSaveClient = async (clientData: Client) => {
        try {
            if (clientData.id) {
                await updateClient(clientData.id, clientData);
            } else {
                await createClient(clientData);
            }
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
            <ClientForm onSave={handleSaveClient} />
            <ClientList clients={clients} onEdit={
                (client: Client) => {
                setEditingClient(client);
                setEditModalOpen(true);
            }} />
            {editingClient && (
                <ClientEditModal
                    open={isEditModalOpen}
                    client={editingClient}
                    onSave={handleSaveClient}
                    onClose={() => {
                        setEditModalOpen(false);
                        setEditingClient(null);
                    }}
                />
            )}
        </div>
    );
};
