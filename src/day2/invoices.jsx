import React, { useMemo } from 'react';
import { Link, Outlet, NavLink, useSearchParams, useLocation } from 'react-router-dom';
import { getInvoices } from './data';

export default function Invoices() {
  // const invoices = useMemo(() => getInvoices(), []);
  const invoices = getInvoices();
  const [searchParams, setSearchParams] = useSearchParams();
  const cost = useMemo(() => [1, 2, 3], []);
  return (
    <div style={{ display: 'flex' }}>
      <nav
        style={{
          borderRight: 'solid 1px',
          padding: '1rem'
        }}
      >
        <input
          value={searchParams.get('filter') || ''}
          onChange={event => {
            const filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {invoices
          .filter(invoice => {
            const filter = searchParams.get('filter');
            if (!filter) {
              return true;
            }
            const name = invoice.name.toLocaleLowerCase();
            return name.startsWith(filter.toLocaleLowerCase());
          })
          .map(invoice => (
            // <Link style={{ display: 'block', margin: '1rem 0' }} to={`/invoices/${invoice.number}`} key={invoice.number}>
            //   {invoice.name}
            // </Link>
            <QueryNavLink
              style={({ isActive }) => ({
                display: 'block',
                margin: '1rem 0',
                color: isActive ? 'red' : ''
              })}
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </QueryNavLink>
          ))}
      </nav>
      <OtherMemo cost={cost} />
      <div>
        <h2 style={{ display: 'block' }}> Detail Invoice </h2>
        <Outlet />
      </div>
    </div>
  );
}

function QueryNavLink({ to, ...props }) {
  const location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}

function OtherComponent({ cost }) {
  console.log('re-render Cost');
  return <h2>Cost </h2>;
}

const OtherMemo = React.memo(OtherComponent);
