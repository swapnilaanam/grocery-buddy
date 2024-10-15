import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes';
import AuthProvider from './providers/AuthProvider';
import { ToastContainer } from 'react-toastify';
import GroceryProvider from './providers/GroceryProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider >
      <GroceryProvider>
        <RouterProvider router={router} />
      </GroceryProvider>
    </AuthProvider>
    <ToastContainer />
  </StrictMode>,
)
