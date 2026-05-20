import { useState, useMemo, useCallback } from 'react';
import type { UserListQuery } from './_types/user-list-query';
import { USER_QUERY_DEFAULTS } from './_const/user-query-defaults';
import SearchInput from '../_components/SearchInput';
import DropdownInput from '../_components/DropdownInput';
import { MOCK_USERS } from './_mocks/users';
import { MOCK_ROLES } from './_mocks/roles';
import { STATUS_OPTIONS } from './_mocks/statuses';
import UserTable from './_components/UserTable';
import type { DropdownOption } from '../../types/domain';

export default function UsersPage() {
  const [filters, setFilters] = useState<UserListQuery>(USER_QUERY_DEFAULTS);

  const handleFilterChange = useCallback((key: keyof UserListQuery, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1
    }));
  }, []);

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

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">User Management</h1>
        <p className="text-sm text-slate-500 mt-1">Manage user roles and permissions.</p>
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

      {/* TABEL USERS */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <UserTable data={filteredUsers} />
      </div>
    </main>
  );
}

function RoleOptions(): DropdownOption[] {
  return MOCK_ROLES?.map((role) => ({
    key: role?.name,
    value: role?.name
  }))
}
