/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { createContext, useContext, useMemo, useState } from 'react';
import { Routes, Route, Outlet, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Invoices, Invoice, SentInvoices } from './Invoices';

const fakeAuthenticatonProvider = {
  isAuth: false,
  signin(callback) {
    fakeAuthenticatonProvider.isAuth = true;
    setTimeout(() => {
      callback();
    }, 100);
  },
  signout(callback) {
    fakeAuthenticatonProvider.isAuth = false;
    setTimeout(() => {
      callback();
    }, 100);
  }
};

const AuthContext = createContext({});
function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signin = (newUser, callback) =>
    fakeAuthenticatonProvider.signin(() => {
      setUser(newUser);
      callback();
    });

  const signout = callback =>
    fakeAuthenticatonProvider.signin(() => {
      setUser(null);
      callback();
    });

  const values = useMemo(
    () => ({
      user,
      signin,
      signout
    }),
    [user]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default function HomePage() {
  return (
    <AuthProvider>
      <h1>Auth Example</h1>

      <p>
        This example demonstrates a simple login flow with three pages: a public page, a protected page, and a login
        page. In order to see the protected page, you must first login. Pretty standard stuff.
      </p>

      <p>
        First, visit the public page. Then, visit the protected page. You're not yet logged in, so you are redirected to
        the login page. After you login, you are redirected back to the protected page.
      </p>

      <p>
        Notice the URL change each time. If you click the back button at this point, would you expect to go back to the
        login page? No! You're already logged in. Try it out, and you'll see you go back to the page you visited just
        *before* logging in, the public page.
      </p>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" index element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/protected"
            element={
              <RequireAuth>
                <PrivatePage />
              </RequireAuth>
            }
          />
          <Route
            path="invoices/*"
            element={
              <RequireAuth>
                <InvoiceRoutes />
              </RequireAuth>
            }
          >
            {/* <Route path=":invoiceId" element={<Invoice />} />
            <Route path="sent" element={<SentInvoices />} /> */}
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

function InvoiceRoutes() {
  return (
    <div>
      <p>Look, more routes!</p>
      <Routes>
        <Route path="/" element={<Invoices />}>
          <Route index element={<SentInvoices />} />
          <Route path=":invoiceId" element={<Invoice />} />
          <Route path="sent" element={<SentInvoices />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <AuthStatus />

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
        <li>
          <Link to="/invoices">Invoices Page</Link>
        </li>
      </ul>

      <div>
        Outlet will instead of Children
        <Outlet />
      </div>
    </div>
  );
}

function AuthStatus() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{' '}
      <button
        type="button"
        onClick={() => {
          auth.signout(() => navigate('/'));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function PrivatePage() {
  return <h3>Private Page</h3>;
}

function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || '/';

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');

    auth.signin(username, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true });
    });
  }
  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{' '}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
