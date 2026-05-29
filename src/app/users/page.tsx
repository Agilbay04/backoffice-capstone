import { useState, useCallback } from 'react';
import type { TUserParams } from '@/app/users/_types/types';
import { USER_PARAMS_DEFAULT } from '@/app/users/_const/consts';
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
import { useUserList } from '@/app/users/_hooks/use-user-list';
import { useCreateUser } from '@/app/users/_hooks/use-create-user';
import { ApiClientError } from '@/api/client';
import { useDeleteUser } from './_hooks/use-delete-user';

export default function UsersPage() {
  const [filters, setFilters] = useState<TUserParams>(USER_PARAMS_DEFAULT);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { data, isLoading, error, refetch } = useUserList(filters);
  const createMutation = useCreateUser();
  const deleteMutation = useDeleteUser();

  const handleFilterChange = useCallback((key: keyof TUserParams, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1
    }));
  }, []);

  const handleCreateUser =  async (formData: Partial<IUser>) => {
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
        <UserTable 
          data={data?.items ?? []} 
          onDelete={async (id) => { await deleteMutation.mutateAsync(id); }} 
        />
      </div>
    );
  }

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

      {/* Content */}
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
    key: role?.name,
    value: role?.name
  }));
};
