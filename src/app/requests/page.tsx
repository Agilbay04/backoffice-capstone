import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { TRequestParams } from '@/app/requests/_types/types';
import { REQUEST_PARAMS_DEFAULT } from '@/app/requests/_const/consts';
import SearchInput from '@/app/_components/search-input';
import DropdownInput from '@/app/_components/dropdown-input';
import RequestTable from '@/app/requests/_components/request-table';
import RequestForm from '@/app/requests/_components/request-form';
import { Button } from '@/app/_components/ui/button';
import { Spinner } from '@/app/_components/ui/spinner';
import { ApiClientError } from '@/api/client';
import { Pagination } from '@/app/_components/ui/pagination';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/app/_components/ui/dialog';
import { MOCK_STATUSES } from './_mocks/statuses';
import { MOCK_PRIORITIES } from './_mocks/priorities';
import { useRequestListQuery } from './_hooks/use-request-list-query';
import { useCreateRequestMutation } from './_hooks/use-create-request-mutation';
import { useDeleteRequestMutation } from './_hooks/use-delete-request-mutation';
import type { IRequest } from '@/types/domain';

export default function RequestsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filters: TRequestParams = {
    search: searchParams.get('search') || '',
    status: searchParams.get('status') || '',
    priority: searchParams.get('priority') || '',
    page: Number(searchParams.get('page')) || REQUEST_PARAMS_DEFAULT.page,
    perPage: Number(searchParams.get('perPage')) || REQUEST_PARAMS_DEFAULT.perPage,
  };

  const { data, isLoading, error, refetch } = useRequestListQuery(filters);
  const createMutation = useCreateRequestMutation();
  const deleteMutation = useDeleteRequestMutation();

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

  const handleFilterChange = useCallback((key: keyof TRequestParams, value: string | number) => {
    updateParams(key, value);
  }, [updateParams]);

  const handlePageChange = useCallback((page: number) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('page', String(page));
      return next;
    });
  }, [setSearchParams]);

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
          <Button variant="outline" size="sm" onClick={() => refetch()}>Retry</Button>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <RequestTable
          data={data?.items ?? []}
          onDelete={async (id) => { await deleteMutation.mutateAsync(id); }}
          isDeleting={deleteMutation.isPending}
        />
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
