import { useParams } from 'react-router-dom';

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <main>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">User Detail</h1>
      <p className="text-sm text-slate-500 mt-1">User ID: {id}</p>
    </main>
  );
}