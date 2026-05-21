import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } 
from "react-router-dom";

import { AuthProvider } from "@/app/login/_hooks/use-auth";

import AppLayout from "@/app/_components/AppLayout";
import AuthLayout from "@/app/_components/AuthLayout";

import LoginPage from "@/app/login/page";
import DashboardPage from "@/app/dashboard/page";
import UsersPage from "@/app/users/page";
import UserDetailPage from "@/app/users/[id]/page";
import RequestsPage from "@/app/requests/page";
import RequestDetailPage from "@/app/requests/[id]/page";
import AuditLogsPage from "@/app/audit-logs/page";

import NotFoundPage from "@/app/not-found";
import ForbiddenPage from "@/app/forbidden";

import "./index.css";
import AuthGuard from "@/app/_components/AuthGuard";

const router = createBrowserRouter([
  // Standalone pages
  { path: '/forbidden', element: <ForbiddenPage /> },
  { path: '*', element: <NotFoundPage /> },

  // Auth pages
  {
    path: '/login',
    element: <AuthLayout />,
    children: [{ index: true, element: <LoginPage /> }],
  },

  // App pages — sidebar + topbar
  {
    element: <AuthGuard />,
    children: [
      {
        path: '/',
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'users', element: <UsersPage /> },
          { path: 'users/:id', element: <UserDetailPage /> },
          { path: 'requests', element: <RequestsPage /> },
          { path: 'requests/:id', element: <RequestDetailPage /> },
          { path: 'audit-logs', element: <AuditLogsPage /> },
        ],  
      }
    ],
  },
  
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
