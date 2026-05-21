import { useState, useMemo, useCallback, useEffect } from 'react';
import type { UserListQuery } from '@/app/users/_types/user-list-query';
import { USER_QUERY_DEFAULTS } from '@/app/users/_const/user-query-defaults';
import SearchInput from '@/app/_components/SearchInput';
import DropdownInput from '@/app/_components/DropdownInput';
import { MOCK_USERS } from '@/app/users/_mocks/users';
import { MOCK_ROLES } from '@/app/users/_mocks/roles';
import { STATUS_OPTIONS } from '@/app/users/_mocks/statuses';
import UserTable from '@/app/users/_components/UserTable';
import UserForm from '@/app/users/_components/UserForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../_components/ui/dialog';
import type { DropdownOption } from '../../types/domain';
import { Button } from '@/app/_components/ui/button';
import { Spinner } from '@/app/_components/ui/spinner';

export default function UsersPage() {
  const [filters, setFilters] = useState<UserListQuery>(USER_QUERY_DEFAULTS);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleFilterChange = useCallback((key: keyof UserListQuery, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1
    }));
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [isLoading]);

  const filteredUsers = useMemo(() => {
    return MOCK_USERS?.filter((user) => {
      if (!user) return false;

      const searchCriteria = filters?.search?.toLowerCase() ?? "";

      const matchesName = user?.name?.toLowerCase()?.includes(searchCriteria) ?? false;
      const matchesEmail = user?.email?.toLowerCase()?.includes(searchCriteria) ?? false;

      const searchMatch = searchCriteria ? matchesName || matchesEmail : true;
      
      const roleMatch = filters?.role && filters?.role !== 'all' 
        ? user?.role === filters?.role 
        : true;

      const statusMatch = filters?.status && filters?.status !== 'all' 
        ? user?.status === filters?.status 
        : true;

      return searchMatch && roleMatch && statusMatch;
    }) ?? [];
  }, [filters]);

  const handleCreateUser = useCallback(async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log('Create user:', data);
    return { success: true };
  }, []);

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Users Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage user roles and permissions.</p>
        </div>
        <Button variant="slate" onClick={() => setIsCreateOpen(true)}>
          + Add User
        </Button>
      </div>

      {/* LOCAL STATE TRIGGERS */}
      <section className="flex items-end gap-4 p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
        {/* Input Search */}
        <div className="flex-1">
          <SearchInput
            label="Search"
            value={filters?.search ?? ""}
            onChange={(val) => handleFilterChange('search', val)}
            placeholder="Search by name or email..."
            style={{ width: '100%' }}
          />
        </div>

        {/* Dropdown Role */}
        <div className="w-48">
          <DropdownInput
            label="Role"
            value={filters?.role}
            options={RoleOptions()} 
            onChange={(val) => handleFilterChange('role', val)} 
          />
        </div>

        {/* Dropdown Status */}
        <div className="w-48">
          <DropdownInput
            label="Status"
            value={filters?.status}
            options={STATUS_OPTIONS} 
            onChange={(val) => handleFilterChange('status', val)} 
          />
        </div>
      </section>

      {/* CONDITIONAL CONTENT LOADING */}
      {isLoading ? (
        <div className="w-full h-64 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-3">
          <Spinner className="text-slate-900" />
          <span className="text-xs font-medium text-slate-400 animate-pulse">
            Fetching users data...
          </span>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <UserTable data={filteredUsers} />
        </div>
      )}

      {/* DIALOG CREATE USER */}
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
            onSuccess={() => setIsCreateOpen(false)}
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