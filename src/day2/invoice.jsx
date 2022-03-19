import React, { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getInvoice } from './data';

export default function Invoice() {
  const params = useParams();
  const { invoiceId } = params;
  const invoice = useMemo(() => getInvoice(parseInt(invoiceId, 10)), [invoiceId]);
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <main style={{ padding: '1rem' }}>
      <button
        type="button"
        onClick={() => {
          navigate(`/invoices${location.search}`);
        }}
      >
        Back
      </button>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>
    </main>
  );
}
