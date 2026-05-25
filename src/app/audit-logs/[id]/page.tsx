import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auditLogsApi } from '@/api/audit-logs/audit-logs';
import { Badge } from '@/app/_components/ui/badge';
import { Button } from '@/app/_components/ui/button';
import { Spinner } from '@/app/_components/ui/spinner';
import { ApiClientError } from '@/api/client';
import type { AuditLog } from '@/types/domain';

export default function AuditLogDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [log, setLog] = useState<AuditLog | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        let cancelled = false;

        const fetchLog = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await auditLogsApi.getById(id);
                if (!cancelled) setLog(response.data);
            } catch (err) {
                if (!cancelled) {
                    if (err instanceof ApiClientError) {
                        setError(err.message);
                    } else {
                        setError('Failed to load audit log.');
                    }
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        fetchLog();
        return () => { cancelled = true; };
    }, [id]);

    if (isLoading) {
        return (
            <main className="space-y-6">
                <div className="w-full h-64 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-3">
                    <Spinner className="text-slate-900" />
                    <span className="text-xs font-medium text-slate-400 animate-pulse">Loading audit log...</span>
                </div>
            </main>
        );
    }

    if (error || !log) {
        return (
            <main className="space-y-6">
                <div className="w-full h-64 bg-white rounded-lg border border-red-200 shadow-sm flex flex-col items-center justify-center gap-3">
                    <span className="text-sm font-medium text-red-600">{error ?? 'Audit log not found.'}</span>
                    <Button variant="outline" size="sm" onClick={() => navigate('/audit-logs')}>Back to Audit Logs</Button>
                </div>
            </main>
        );
    }

    return (
        <main className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => navigate('/audit-logs')}>&larr; Back</Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Audit Log Entry</h1>
                    <p className="text-sm text-slate-500 mt-1">Log ID: {log.id}</p>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-4">
                <h2 className="text-lg font-semibold text-slate-900">Details</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Actor</span>
                            <p className="mt-1 text-sm text-slate-700">{log.actor}</p>
                        </div>
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Action</span>
                            <div className="mt-1">
                                <Badge variant="outline" className="font-mono tracking-wide text-xs">{log.action}</Badge>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Target</span>
                            <p className="mt-1 text-sm text-slate-700">{log.target ?? '—'}</p>
                        </div>
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Timestamp</span>
                            <p className="mt-1 text-sm text-slate-700">{new Date(log.timestamp).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Details</span>
                    <p className="mt-1 text-sm text-slate-700">{log.details ?? '—'}</p>
                </div>
            </div>
        </main>
    );
}
