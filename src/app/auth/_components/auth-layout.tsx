import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
      <Outlet />
    </div>
  );
}
