import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } 
from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
import { setHttpErrorHandler } from "@/api/client";

// Tanstack Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: parseInt(import.meta.env.VITE_STALE_TIME) || 30_000,
      retry: parseInt(import.meta.env.VITE_RETRY) || 1,
      refetchOnWindowFocus: Boolean(import.meta.env.VITE_REFETCH_ON_WINDOW_FOCUS),
    },
  },
});

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

// Global HTTP error handler — triggers on 401/403 from any API call
setHttpErrorHandler((status) => {
  if (status === 401) {
    localStorage.removeItem('auth_user');
    router.navigate('/login', { replace: true });
  } else if (status === 403) {
    router.navigate('/forbidden', { replace: true });
  }
});

async function startApp() {
  if (import.meta.env.VITE_ENABLE_MSW === 'true') {
    const { worker } = await import('./api/mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </StrictMode>,
  );
}

startApp();
