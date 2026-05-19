import { useState, useMemo, useCallback } from 'react';
import type { UserListQuery } from './_types/user-list-query';
import { USER_QUERY_DEFAULTS } from './_const/user-query-defaults';
import SearchInput from '../_components/SearchInput';
import DropdownInput from '../_components/DropdownInput';
import { MOCK_USERS } from './_mocks/user';
import { ROLE_OPTIONS } from './_mocks/role_options';
import { STATUS_OPTIONS } from './_mocks/status_options';
import UserTable from './_components/UserTable';

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
    <main>
      <div style={{ marginBottom: '20px' }}>
        <h1>User Management</h1>
        <p style={{ color: '#64748b', marginTop: '15px' }}>Manage user roles and permissions.</p>
      </div>

      {/* LOCAL STATE TRIGGERS */}
      <section style={{ 
        display: 'flex', 
        gap: '15px', 
        marginBottom: '20px', 
        padding: '15px', 
        backgroundColor: '#ffffff', 
        borderRadius: '6px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)' 
      }}>
        {/* Input Search */}
        <SearchInput
          label="Search"
          value={filters?.search ?? ""}
          onChange={(val) => handleFilterChange('search', val)}
          placeholder="Search by name or email..."
          style={{ width: '100%' }}
        />

        {/* Dropdown Role */}
        <DropdownInput
          label="Role"
          value={filters?.role}
          options={ROLE_OPTIONS} 
          onChange={(val) => handleFilterChange('role', val)} 
        />

        {/* Dropdown Status */}
        <DropdownInput
          label="Status"
          value={filters?.status}
          options={STATUS_OPTIONS} 
          onChange={(val) => handleFilterChange('status', val)} 
        />
      </section>

      {/* TABEL USERS */}
      <UserTable data={filteredUsers} />
    </main>
  );
}