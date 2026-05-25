import { useState, useCallback, useEffect } from 'react';
import type { RequestListQuery } from '@/app/requests/_types/request-list-query';
import { REQUEST_QUERY_DEFAULTS } from '@/app/requests/_const/request-query-defaults';
import SearchInput from '@/app/_components/search-input';
import DropdownInput from '@/app/_components/dropdown-input';
import { requestsApi } from '@/api/requests/requests';
import RequestTable from '@/app/requests/_components/request-table';
import type { DropdownOption, Request } from '@/types/domain';
import { Button } from '@/app/_components/ui/button';
import { Spinner } from '@/app/_components/ui/spinner';
import { ApiClientError } from '@/api/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/app/_components/ui/dialog';
import { FormInput } from '@/app/_components/ui/form-input';
import { useForm } from 'react-hook-form';

const STATUS_OPTIONS: DropdownOption[] = [
    { key: 'pending', value: 'pending' },
    { key: 'approved', value: 'approved' },
    { key: 'rejected', value: 'rejected' },
];

const PRIORITY_OPTIONS: DropdownOption[] = [
    { key: 'low', value: 'low' },
    { key: 'medium', value: 'medium' },
    { key: 'high', value: 'high' },
    { key: 'critical', value: 'critical' },
];

export default function RequestsPage() {
    const [filters, setFilters] = useState<RequestListQuery>(REQUEST_QUERY_DEFAULTS);

    const [requests, setRequests] = useState<Request[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            title: '',
            requestedBy: '',
            assignee: '',
        },
    });

    const handleFilterChange = useCallback((key: keyof RequestListQuery, value: string | number) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
            page: 1,
        }));
    }, []);

    useEffect(() => {
        let cancelled = false;

        const fetchRequests = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await requestsApi.list({
                    search: filters.search,
                    status: filters.status,
                    priority: filters.priority,
                    page: filters.page,
                    pageSize: filters.pageSize,
                });
                if (!cancelled) setRequests(response.items);
            } catch (err) {
                if (!cancelled) {
                    if (err instanceof ApiClientError) {
                        setError(err.message);
                    } else {
                        setError('Failed to load requests. Please try again.');
                    }
                    if (!cancelled) setRequests([]);
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        fetchRequests();
        return () => { cancelled = true; };
    }, [filters]);

    const handleCreate = async (data: { title: string; requestedBy: string; assignee: string }) => {
        setCreateError(null);
        try {
            await requestsApi.create(data);
            setIsCreateOpen(false);
            reset();
            setFilters((prev) => ({ ...prev }));
        } catch (err) {
            if (err instanceof ApiClientError) {
                setCreateError(err.message);
            } else {
                setCreateError('Failed to create request.');
            }
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await requestsApi.delete(id);
            setFilters((prev) => ({ ...prev }));
        } catch (err) {
            if (err instanceof ApiClientError) {
                setError(err.message);
            } else {
                setError('Failed to delete request.');
            }
        }
    };

    return (
        <main className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Requests</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage and review all requests.</p>
                </div>
                <Button className="bg-slate-900" onClick={() => setIsCreateOpen(true)}>
                    + Add Request
                </Button>
            </div>

            <section className="flex flex-wrap items-end gap-4 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="flex-1 min-w-[200px]">
                    <SearchInput
                        label="Search"
                        value={filters?.search ?? ''}
                        onChange={(val) => handleFilterChange('search', val)}
                        placeholder="Search by title, requester, or assignee..."
                        style={{ width: '100%' }}
                    />
                </div>

                <div className="w-48">
                    <DropdownInput
                        label="Status"
                        value={filters?.status}
                        options={STATUS_OPTIONS}
                        onChange={(val) => handleFilterChange('status', val)}
                    />
                </div>

                <div className="w-48">
                    <DropdownInput
                        label="Priority"
                        value={filters?.priority}
                        options={PRIORITY_OPTIONS}
                        onChange={(val) => handleFilterChange('priority', val)}
                    />
                </div>
            </section>

            {isLoading ? (
                <div className="w-full h-64 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-3">
                    <Spinner className="text-slate-900" />
                    <span className="text-xs font-medium text-slate-400 animate-pulse">Fetching requests...</span>
                </div>
            ) : error ? (
                <div className="w-full h-64 bg-white rounded-lg border border-red-200 shadow-sm flex flex-col items-center justify-center gap-3">
                    <span className="text-sm font-medium text-red-600">{error}</span>
                    <Button variant="outline" size="sm" onClick={() => setFilters((prev) => ({ ...prev }))}>Retry</Button>
                </div>
            ) : (
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                    <RequestTable data={requests} onDelete={handleDelete} />
                </div>
            )}

            <Dialog open={isCreateOpen} onOpenChange={(open) => { if (!open) { setIsCreateOpen(false); reset(); } }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Request</DialogTitle>
                        <DialogDescription>Fill in the form to create a new request.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(handleCreate)} noValidate className="space-y-4">
                        {createError && (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {createError}
                            </div>
                        )}
                        <FormInput
                            label="Title"
                            placeholder="Request title"
                            error={errors?.title?.message}
                            {...register('title', { required: 'Title is required' })}
                        />
                        <FormInput
                            label="Requested By"
                            placeholder="Requester name"
                            error={errors?.requestedBy?.message}
                            {...register('requestedBy', { required: 'Requester is required' })}
                        />
                        <FormInput
                            label="Assignee"
                            placeholder="Assignee name (optional)"
                            error={errors?.assignee?.message}
                            {...register('assignee')}
                        />
                        <Button type="submit" className="w-full bg-slate-900" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <span className="flex items-center gap-2"><Spinner /> Creating...</span>
                            ) : 'Create Request'}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </main>
    );
}
