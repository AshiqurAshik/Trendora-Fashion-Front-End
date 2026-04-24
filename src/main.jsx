import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Root from './Pages/Root/Root';
import Tailoring from './Pages/Tailoring/Tailoring';
import Homepage from './Pages/Home/Homepage';
import LoginPage from './Components/Login/LoginPage';
import RegisterPage from './Components/Register/RegisterPage';
import Accessories from './Pages/Accessories/Accessories';
import Heritage from './Pages/Heritage/Heritage';
import Concierge from './Pages/Concierge/Concierge';
import AllSuit from './Pages/Home/AllSuit';
import SuitDetails from './Pages/Home/SuitDetails';
import AuthProvider from './Auth/AuthProvider';
import Cart from './Components/Cart/Cart';
import AllProducts from './Pages/Accessories/AllProducts';
import ProductDetails from './Pages/Accessories/ProductDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    children: [
      {
        index: true,
        Component: Homepage,
      },

      {
        path: '/tailoring',
        Component: Tailoring,
      },

      {
        path: '/accessories',
        Component: Accessories,
      },
      {
        path: '/heritage',
        Component: Heritage,
      },
      {
        path: '/concierge',
        Component: Concierge,
      },
      {
        path: '/cart',
        Component: Cart,
      },
    ],
  },

  {
    path: '/login',
    Component: LoginPage,
  },

  {
    path: '/register',
    Component: RegisterPage,
  },
  {
    path: '/all-suit',
    Component: AllSuit,
  },

  {
    path: '/product/:id',
    Component: SuitDetails,
  },
  {
    path: '/all-accessories',
    Component: AllProducts,
  },
  {
    path: '/accessories/:id',
    Component: ProductDetails,
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
