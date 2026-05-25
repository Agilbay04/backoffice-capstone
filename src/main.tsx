import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } 
from "react-router-dom";

import { AuthProvider } from "@/app/auth/_hooks/use-auth";

import AppLayout from "@/app/_components/app-layout";
import AuthLayout from "@/app/auth/_components/auth-layout";

import LoginPage from "@/app/auth/page";
import DashboardPage from "@/app/dashboard/page";
import UsersPage from "@/app/users/page";
import UserDetailPage from "@/app/users/[id]/page";
import RequestsPage from "@/app/requests/page";
import RequestDetailPage from "@/app/requests/[id]/page";
import AuditLogsPage from "@/app/audit-logs/page";
import AuditLogDetailPage from "@/app/audit-logs/[id]/page";

import NotFoundPage from "@/app/not-found";
import ForbiddenPage from "@/app/forbidden";

import "./index.css";
import AuthGuard from "@/app/_components/auth-guard";

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
          { path: 'audit-logs/:id', element: <AuditLogDetailPage /> },
        ],  
      }
    ],
  },
  
]);

async function startApp() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./api/mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>,
  );
}

startApp();
