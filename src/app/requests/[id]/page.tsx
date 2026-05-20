import { useParams } from 'react-router-dom';

export default function RequestDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <main>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">Request Detail</h1>
      <p className="text-sm text-slate-500 mt-1">Request ID: {id}</p>
    </main>
  );
}