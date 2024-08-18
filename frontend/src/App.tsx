import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { NavigationMenu } from './components/NavigationMenu/NavigationMenu';
import { ClientsPage } from './pages/ClientsPage';
import { HomePage } from './pages/HomePage';

export const App: React.FC = () => 
    <Router>
        <NavigationMenu />
        <main style={{ padding: '16px' }}>
            <Routes>
                <Route path="/clients" element={<ClientsPage />} />
                {/* <Route path="/payments" element={<PaymentsPage />} /> */}
                <Route path="/" element={<HomePage />} />
            </Routes>
        </main>
    </Router>
