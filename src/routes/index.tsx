import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Login } from '@/pages/login'
import { Register } from '@/pages/register'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
])