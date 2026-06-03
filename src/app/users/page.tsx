import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { TUserParams } from '@/app/users/_types/types';
import SearchInput from '@/app/_components/search-input';
import DropdownInput from '@/app/_components/dropdown-input';
import { MOCK_ROLES } from '@/app/users/_mocks/roles';
import { STATUS_OPTIONS } from '@/app/users/_mocks/statuses';
import UserTable from '@/app/users/_components/user-table';
import UserForm from '@/app/users/_components/user-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/app/_components/ui/dialog';
import type { IDropdownOption, IUser } from '@/types/domain';
import { Button } from '@/app/_components/ui/button';
import { Spinner } from '@/app/_components/ui/spinner';
import { ApiClientError } from '@/api/client';
import { Pagination } from '@/app/_components/ui/pagination';
import { useUserListQuery } from '@/app/users/_hooks/use-user-list-query';
import { useCreateUserMutation } from '@/app/users/_hooks/use-create-user-mutation';
import { useDeleteUserMutation } from './_hooks/use-delete-user-mutation';

export default function UsersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filters: TUserParams = {
    search: searchParams.get('search') || '',
    role: searchParams.get('role') || '',
    status: searchParams.get('status') || '',
    page: Number(searchParams.get('page')) || 1,
    perPage: Number(searchParams.get('perPage')) || 10,
  };

  const { data, isLoading, error, refetch } = useUserListQuery(filters);
  const createMutation = useCreateUserMutation();
  const deleteMutation = useDeleteUserMutation();

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

  const handleFilterChange = useCallback((key: keyof TUserParams, value: string | number) => {
    updateParams(key, value);
  }, [updateParams]);

  const handlePageChange = useCallback((page: number) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('page', String(page));
      return next;
    });
  }, [setSearchParams]);

  const handleCreateUser = async (formData: Partial<IUser>) => {
    try {
      await createMutation.mutateAsync(formData);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof ApiClientError ? err.message : 'Failed to create user.',
      };
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="w-full h-64 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-3">
          <Spinner className="text-slate-900" />
          <span className="text-xs font-medium text-slate-400 animate-pulse">
            Fetching users data...
          </span>
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
        <UserTable
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
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Users Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage user roles and permissions.</p>
        </div>
        <Button className="bg-slate-900" onClick={() => setIsCreateOpen(true)}>
          + Add User
        </Button>
      </div>

      <section className="flex items-end gap-4 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
        <div className="flex-1">
          <SearchInput
            label="Search"
            value={filters?.search ?? ''}
            onChange={(val) => handleFilterChange('search', val)}
            placeholder="Search by name or email..."
            style={{ width: '100%' }}
          />
        </div>

        <div className="w-48">
          <DropdownInput
            label="Role"
            value={filters?.role}
            options={roleOptions()}
            onChange={(val) => handleFilterChange('role', val)}
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
      </section>

      {renderContent()}

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Fill in the form below to create a new user.
            </DialogDescription>
          </DialogHeader>
          <UserForm
            mode="create"
            onSubmit={handleCreateUser}
            onSuccess={() => {
              setIsCreateOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </main>
  );
}

function roleOptions(): IDropdownOption[] {
  if (MOCK_ROLES?.length === 0) return [];
  return MOCK_ROLES?.map((role) => ({
    key: role?.code,
    value: role?.code
  }));
};
