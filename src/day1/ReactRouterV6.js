import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

function ReactRouter() {
  return (
    <BrowserRouter>
      <h1>Hello</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="invoices" element={<Invoices />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <div>
      <h1>Welcome to the app!</h1>
      <nav>
        <Link to="invoices">Invoices</Link> | <Link to="dashboard">Dashboard</Link>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

function Invoices() {
  return <h1>Invoices</h1>;
}

function Dashboard() {
  return <h1>Dashboard</h1>;
}

export default ReactRouter;
