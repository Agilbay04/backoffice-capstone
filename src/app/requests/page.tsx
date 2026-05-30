import { useState, useCallback } from 'react';
import type { TRequestParams } from '@/app/requests/_types/types';
import { REQUEST_PARAMS_DEFAULT } from '@/app/requests/_const/consts';
import SearchInput from '@/app/_components/search-input';
import DropdownInput from '@/app/_components/dropdown-input';
import RequestTable from '@/app/requests/_components/request-table';
import RequestForm from '@/app/requests/_components/request-form';
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
import { MOCK_STATUSES } from './_mocks/statuses';
import { MOCK_PRIORITIES } from './_mocks/priorities';
import { useRequestList } from './_hooks/use-request-list';
import { useCreateRequest } from './_hooks/use-create-request';
import { useDeleteRequest } from './_hooks/use-delete-request';
import type { IRequest } from '@/types/domain';

export default function RequestsPage() {
    const [filters, setFilters] = useState<TRequestParams>(REQUEST_PARAMS_DEFAULT);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const { data, isLoading, error, refetch } = useRequestList(filters);
    const createMutation = useCreateRequest();
    const deleteMutation = useDeleteRequest();

    const handleFilterChange = useCallback((key: keyof TRequestParams, value: string | number) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
            page: 1,
        }));
    }, []);

    const handleCreate = async (formData: Partial<IRequest>) => {
        try {
            await createMutation.mutateAsync(formData);
            return { success: true };
        } catch (err) {
            return {
                success: false,
                error: err instanceof ApiClientError ? err.message : 'Failed to create request.',
            };
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="w-full h-64 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-3">
                    <Spinner className="text-slate-900" />
                    <span className="text-xs font-medium text-slate-400 animate-pulse">Fetching requests...</span>
                </div>
            );
        }

        if (error) {
            return (
                <div className="w-full h-64 bg-white rounded-lg border border-red-200 shadow-sm flex flex-col items-center justify-center gap-3">
                    <span className="text-sm font-medium text-red-600">{error?.message}</span>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => refetch()}
                    >
                        Retry
                    </Button>
                </div>
            );
        }

        return (
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <RequestTable 
                    data={data?.items ?? []} 
                    onDelete={async (id) => { await deleteMutation.mutateAsync(id); }} 
                />
            </div>
        );
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
                <div className="flex-1 min-w-50">
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
                        options={MOCK_STATUSES}
                        onChange={(val) => handleFilterChange('status', val)}
                    />
                </div>

                <div className="w-48">
                    <DropdownInput
                        label="Priority"
                        value={filters?.priority}
                        options={MOCK_PRIORITIES}
                        onChange={(val) => handleFilterChange('priority', val)}
                    />
                </div>
            </section>

            {renderContent()}

            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Request</DialogTitle>
                        <DialogDescription>Fill in the form to create a new request.</DialogDescription>
                    </DialogHeader>
                    <RequestForm
                        mode="create"
                        onSubmit={handleCreate}
                        onSuccess={() => {
                            setIsCreateOpen(false);
                        }}
                    />
                </DialogContent>
            </Dialog>
        </main>
    );
}
