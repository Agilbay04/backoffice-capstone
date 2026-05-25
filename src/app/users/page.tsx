import { useState, useCallback, useEffect } from 'react';
import type { UserListQuery } from '@/app/users/_types/user-list-query';
import { USER_QUERY_DEFAULTS } from '@/app/users/_const/user-query-defaults';
import SearchInput from '@/app/_components/search-input';
import DropdownInput from '@/app/_components/dropdown-input';
import { usersApi } from '@/api/users/users';
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
import type { DropdownOption, User } from '@/types/domain';
import { Button } from '@/app/_components/ui/button';
import { Spinner } from '@/app/_components/ui/spinner';
import { ApiClientError } from '@/api/client';

export default function UsersPage() {
  const [filters, setFilters] = useState<UserListQuery>(USER_QUERY_DEFAULTS);

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleFilterChange = useCallback((key: keyof UserListQuery, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1
    }));
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await usersApi.list({
          search: filters.search,
          role: filters.role,
          status: filters.status,
          page: filters.page,
          pageSize: filters.pageSize,
        });

                if (!cancelled) {
                    setUsers(response.items);
                }
      } catch (err) {
        if (!cancelled) {
          if (err instanceof ApiClientError) {
            setError(err.message);
          } else {
            setError('Failed to load users. Please try again.');
          }
                    setUsers([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchUsers();

    return () => {
      cancelled = true;
    };
  }, [filters]);

  const handleCreateUser = useCallback(async (data: Partial<User>) => {
    try {
      await usersApi.create(data);
      return { success: true };
    } catch (err) {
      if (err instanceof ApiClientError) {
        return { success: false, error: err.message };
      }
      return { success: false, error: 'Failed to create user.' };
    }
  }, []);

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
            options={RoleOptions()}
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

      {isLoading ? (
        <div className="w-full h-64 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-3">
          <Spinner className="text-slate-900" />
          <span className="text-xs font-medium text-slate-400 animate-pulse">
            Fetching users data...
          </span>
        </div>
      ) : error ? (
        <div className="w-full h-64 bg-white rounded-lg border border-red-200 shadow-sm flex flex-col items-center justify-center gap-3">
          <span className="text-sm font-medium text-red-600">{error}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilters((prev) => ({ ...prev }))}
          >
            Retry
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <UserTable data={users} onDelete={() => setFilters((prev) => ({ ...prev }))} />
        </div>
      )}

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
              setFilters((prev) => ({ ...prev }));
            }}
          />
        </DialogContent>
      </Dialog>
    </main>
  );
}

function RoleOptions(): DropdownOption[] {
  return MOCK_ROLES?.map((role) => ({
    key: role?.name,
    value: role?.name
  }))
}
