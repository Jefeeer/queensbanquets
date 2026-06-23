import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import AdminApp from './admin/AdminApp.jsx';
import { LandingContentProvider } from './content/LandingContentContext.jsx';
import './styles/global.css';

function Root() {
  const isAdminRoute = window.location.pathname.replace(/\/$/, '') === '/admin';

  return isAdminRoute ? <AdminApp /> : <App />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LandingContentProvider>
      <Root />
    </LandingContentProvider>
  </React.StrictMode>,
);
