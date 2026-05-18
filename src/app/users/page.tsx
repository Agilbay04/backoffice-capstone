import { useState } from 'react';
import StatusBadge from '../../common/StatusBadge';
import type { User } from '../../types/domain';
import type { UserListQuery } from './_types/user-list-query';
import { USER_QUERY_DEFAULTS } from './_const/user-query-defaults';

const MOCK_USERS: User[] = [
  { id: '1', name: 'Mama Ghufron', email: 'ghufron@example.com', role: 'admin', status: 'active', createdAt: '2026-05-15' },
  { id: '2', name: 'Manager Ghufron 1', email: 'mngghufron1@example.com', role: 'manager', status: 'active', createdAt: '2026-05-16' },
  { id: '3', name: 'Manager Ghufron 2', email: 'mngghufron4@example.com', role: 'manager', status: 'inactive', createdAt: '2026-05-19' },
  { id: '4', name: 'Operator Ghufron 1', email: 'opghufron2@example.com', role: 'operator', status: 'inactive', createdAt: '2026-05-17' },
  { id: '5', name: 'Operator Ghufron 2', email: 'opghufron3@example.com', role: 'operator', status: 'active', createdAt: '2026-05-18' },
  { id: '6', name: 'Admin Ghufron', email: 'admghufron4@example.com', role: 'admin', status: 'inactive', createdAt: '2026-05-19' }
];

export default function UsersPage() {
  const [filters, setFilters] = useState<UserListQuery>(USER_QUERY_DEFAULTS);

  const handleFilterChange = (key: keyof UserListQuery, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1
    }));
  };

  const filteredUsers = MOCK_USERS.filter((user) => {
    const searchMatch = filters.search 
      ? user.name.toLowerCase().includes(filters.search.toLowerCase()) 
      || user.email.toLowerCase().includes(filters.search.toLowerCase()) 
      : true;
    
    const roleMatch = filters.role && filters.role !== 'all' 
      ? user.role === filters.role 
      : true;

    const statusMatch = filters.status && filters.status !== 'all' 
      ? user.status === filters.status 
      : true;

    return searchMatch && roleMatch && statusMatch;
  });

  return (<main>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>Search</label>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }}
          />
        </div>

        {/* Dropdown Role */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '150px' }}>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>Role</label>
          <select
            value={filters.role}
            onChange={(e) => handleFilterChange('role', e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff' }}
          >
            <option value="all">All Roles</option>
            <option value="admin">ADMIN</option>
            <option value="manager">MANAGER</option>
            <option value="operator">OPERATOR</option>
          </select>
        </div>

        {/* Dropdown Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '150px' }}>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#fff' }}
          >
            <option value="all">All Status</option>
            <option value="active">ACTIVE</option>
            <option value="inactive">INACTIVE</option>
          </select>
        </div>
      </section>

      {/* TABEL USERS */}
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ backgroundColor: '#f1f5f9', textAlign: 'left' }}>
            <th style={{ padding: '12px' }}>Name</th>
            <th style={{ padding: '12px' }}>Email</th>
            <th style={{ padding: '12px' }}>Role</th>
            <th style={{ padding: '12px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px' }}>{user.name}</td>
                <td style={{ padding: '12px' }}>{user.email}</td>
                <td style={{ padding: '12px' }}>{user.role.toUpperCase()}</td>
                <td style={{ padding: '12px' }}>
                  <StatusBadge status={user.status} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}