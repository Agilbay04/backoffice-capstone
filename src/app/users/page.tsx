import StatusBadge from '../../common/StatusBadge';
import type { User } from '../../types/domain';

const MOCK_USERS: User[] = [
  { id: '1', name: 'Mama Ghufron', email: 'ghufron@example.com', role: 'admin', status: 'active', createdAt: '2026-05-15' },
  { id: '2', name: 'Asisten Ghufron 1', email: 'asistenghufron1@example.com', role: 'manager', status: 'active', createdAt: '2026-05-16' },
  { id: '3', name: 'Asisten Ghufron 2', email: 'asistenghufron2@example.com', role: 'operator', status: 'inactive', createdAt: '2026-05-17' },
];

export default function UsersPage() {
  return (
    <main>
      <div style={{ marginBottom: '20px' }}>
        <h1>User Management</h1>
        <p style={{ color: '#64748b', marginTop: '15px' }}>Manage user roles and permissions.</p>
      </div>

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
          {MOCK_USERS.map((user) => (
            <tr key={user.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>{user.name}</td>
              <td style={{ padding: '12px' }}>{user.email}</td>
              <td style={{ padding: '12px' }}>{user.role.toUpperCase()}</td>
              <td style={{ padding: '12px' }}>
                <StatusBadge status={user.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}