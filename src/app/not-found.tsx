import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-slate-900">404</h1>
      <p className="text-slate-500 text-lg">Page not found.</p>
      <p className="text-slate-400 text-sm">
        The page you're looking for doesn't exist.
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