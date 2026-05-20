import { Link } from 'react-router-dom';

export default function ForbiddenPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-slate-900">403</h1>
      <p className="text-slate-500 text-lg">Access Denied.</p>
      <p className="text-slate-400 text-sm">
        You don't have permission to access this page.
      </p>
      <Link
        to="/dashboard"
        className="mt-4 text-blue-600 hover:underline"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}