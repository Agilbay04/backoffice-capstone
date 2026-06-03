import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { TAuditLogParams } from '@/app/audit-logs/_types/types';
import { AUDIT_LOG_PARAMS_DEFAULT } from '@/app/audit-logs/_const/consts';
import SearchInput from '@/app/_components/search-input';
import { useAuditLogListQuery } from '@/app/audit-logs/_hooks/use-audit-log-list-query';
import AuditLogTable from '@/app/audit-logs/_components/audit-log-table';
import { Button } from '@/app/_components/ui/button';
import { Spinner } from '@/app/_components/ui/spinner';
import { Pagination } from '@/app/_components/ui/pagination';

export default function AuditLogsPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters: TAuditLogParams = {
        search: searchParams.get('search') || '',
        page: Number(searchParams.get('page')) || AUDIT_LOG_PARAMS_DEFAULT.page,
        perPage: Number(searchParams.get('perPage')) || AUDIT_LOG_PARAMS_DEFAULT.perPage,
    };

    const { data, isLoading, error, refetch } = useAuditLogListQuery(filters);

    const updateParams = useCallback((key: string, value: string | number) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            if (value) {
                next.set(key, String(value));
            } else {
                next.delete(key);
            }
            next.set('page', '1');
            return next;
        });
    }, [setSearchParams]);

    const handleFilterChange = useCallback((key: keyof TAuditLogParams, value: string | number) => {
        updateParams(key, value);
    }, [updateParams]);

    const handlePageChange = useCallback((page: number) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            next.set('page', String(page));
            return next;
        });
    }, [setSearchParams]);

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
                <Pagination
                    page={data?.meta?.page ?? 1}
                    totalPages={data?.meta?.total_page ?? 1}
                    total={data?.meta?.total ?? 0}
                    perPage={filters.perPage}
                    onPageChange={handlePageChange}
                    onPerPageChange={(size) => updateParams('perPage', size)}
                />
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
