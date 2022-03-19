import React from 'react';
import { Outlet, useParams, Link } from 'react-router-dom';

export function Invoices() {
  return (
    <div>
      <h1>Welcome to the Invoices!</h1>
      <nav>
        <Link to="/invoices/1">Invoice 1</Link> | <Link to="/invoices/sent">Dashboard</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export function Invoice() {
  const { invoiceId } = useParams();
  return <h1>Invoice {invoiceId}</h1>;
}

export function SentInvoices() {
  return <h1>Sent Invoices</h1>;
}
