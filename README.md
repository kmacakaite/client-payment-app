# Client and Payment Management System

## Overview

This application is a simple client and payment management system built using React, NestJS, and PostgreSQL. It provides a user-friendly interface to manage clients and payments, leveraging MUI Material components for a modern UI experience. Each route can be accessible using auth token.

## Tech Stack

- **Frontend**: React, React Router, MUI Material
- **Backend**: NestJS
- **Database**: PostgreSQL

## Features

### Client Management

- **Create a Client**: Capture client details including Name, Address, Phone Number, and an optional Bank Account Number.
- **Edit a Client**: Modify existing client information.
- **View Clients**: Display a list of all clients.

### Payment Management

- **Create a Payment Entry**: Add new payment records with details including Client (selected from a dropdown), Amount, Recipient’s Name, Recipient’s Bank Name, Recipient’s Account Number, and optional Notes. Payments are created with a default status of "Pending".
- **View Payments**: List all payment entries.
- **Approve Payments**: Change a payment’s status to "Approved" directly from the list. A confirmation modal will be displayed before finalizing the change.

## Run application locally

1. Navigate to the `backend` directory.
2. Install dependencies: `npm install`
3. Create `.env` and copy contents from `.env.example`
4. Run `npm run start:docker` to spin up postgres instance
5. Once Docker is ready, start the server: `npm run start:dev`
6. Navigate to the `frontend` directory
7. Install dependencies: `npm install`
8. Start the development server: `npm start`
9. Navigate to http://localhost:3000

## API Endpoints
- **POST /client**: Create a new client.
- **GET /client**: Retrieve a list of clients.
- **GET /client/:id**: Get details of a specific client.
- **PUT /client/:id**: Update a specific client.

- **POST /payments**: Create a new payment entry.
- **GET /payments**: Retrieve a list of payments.
- **GET /payments/:id**: Get details of a specific payment.
- **PUT /payments/:id**: Update a specific payment.


