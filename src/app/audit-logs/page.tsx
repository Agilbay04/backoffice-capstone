import { useState, useCallback } from 'react';
import type { TAuditLogParams } from '@/app/audit-logs/_types/types';
import { AUDIT_LOG_PARAMS_DEFAULT } from '@/app/audit-logs/_const/consts';
import SearchInput from '@/app/_components/search-input';
import { useAuditLogListQuery } from '@/app/audit-logs/_hooks/use-audit-log-list-query';
import AuditLogTable from '@/app/audit-logs/_components/audit-log-table';
import { Button } from '@/app/_components/ui/button';
import { Spinner } from '@/app/_components/ui/spinner';

export default function AuditLogsPage() {
    const [filters, setFilters] = useState<TAuditLogParams>(AUDIT_LOG_PARAMS_DEFAULT);
    const { data, isLoading, error, refetch } = useAuditLogListQuery(filters);

    const handleFilterChange = useCallback((key: keyof TAuditLogParams, value: string | number) => {
        setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
    }, []);

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
                    <span className="text-sm font-medium text-red-600">{error.message}</span>
                    <Button variant="outline" size="sm" onClick={() => refetch()}>Retry</Button>
                </div>
            );
        }

        return (
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <AuditLogTable data={data?.items ?? []} />
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
            
            {renderContent()}

        </main>
    );
}
