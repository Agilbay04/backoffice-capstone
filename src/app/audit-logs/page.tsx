import { useState, useCallback, useEffect } from 'react';
import type { TAuditLogParams } from '@/app/audit-logs/_types/types';
import { AUDIT_LOG_PARAMS_DEFAULT } from '@/app/audit-logs/_const/consts';
import SearchInput from '@/app/_components/search-input';
import { auditLogsApi } from '@/api/audit-logs/audit-logs';
import AuditLogTable from '@/app/audit-logs/_components/audit-log-table';
import type { IAuditLog } from '@/types/domain';
import { Button } from '@/app/_components/ui/button';
import { Spinner } from '@/app/_components/ui/spinner';
import { ApiClientError } from '@/api/client';

export default function AuditLogsPage() {
    const [filters, setFilters] = useState<TAuditLogParams>(AUDIT_LOG_PARAMS_DEFAULT);

    const [logs, setLogs] = useState<IAuditLog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleFilterChange = useCallback((key: keyof TAuditLogParams, value: string | number) => {
        setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
    }, []);

    useEffect(() => {
        let cancelled = false;

        const fetchLogs = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await auditLogsApi.list({
                    search: filters.search,
                    page: filters.page,
                    perPage: filters.perPage,
                });
                if (!cancelled) setLogs(response.items);
            } catch (err) {
                if (!cancelled) {
                    if (err instanceof ApiClientError) {
                        setError(err.message);
                    } else {
                        setError('Failed to load audit logs. Please try again.');
                    }
                    if (!cancelled) setLogs([]);
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        fetchLogs();
        return () => { cancelled = true; };
    }, [filters]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="w-full h-64 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-3">
                    <Spinner className="text-slate-900" />
                    <span className="text-xs font-medium text-slate-400 animate-pulse">Fetching audit logs...</span>
                </div>
            );
        }

        if (error) {
            return (
                <div className="w-full h-64 bg-white rounded-lg border border-red-200 shadow-sm flex flex-col items-center justify-center gap-3">
                    <span className="text-sm font-medium text-red-600">{error}</span>
                    <Button variant="outline" size="sm" onClick={() => setFilters((prev) => ({ ...prev }))}>Retry</Button>
                </div>
            );
        }

        return (
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <AuditLogTable data={logs} />
            </div>
        );
    };

    return (
        <main className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Audit Logs</h1>
                <p className="text-sm text-slate-500 mt-1">Track all activities and changes in the system.</p>
            </div>

            <section className="flex items-end gap-4 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="w-full max-w-md">
                    <SearchInput
                        label="Search"
                        value={filters?.search ?? ''}
                        onChange={(val) => handleFilterChange('search', val)}
                        placeholder="Search by actor or action..."
                        style={{ width: '100%' }}
                    />
                </div>
            </section>
            
            {/* Content */}
            {renderContent()}

        </main>
    );
}
