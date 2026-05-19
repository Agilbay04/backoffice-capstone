import React from 'react';
import StatusBadge from '../../_components/StatusBadge';
import type { User } from '../../../types/domain';

interface UserTableProps {
  data: User[];
}

function UserTable({ data }: UserTableProps) {
    console.log(`UserTable is rendered with ${data?.length ?? 0} users`);

    return (
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
            {data?.length > 0 ? (
            data?.map((user) => (
                <tr key={user?.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px' }}>{user?.name}</td>
                <td style={{ padding: '12px' }}>{user?.email}</td>
                <td style={{ padding: '12px' }}>{user?.role?.toUpperCase()}</td>
                <td style={{ padding: '12px' }}>
                    <StatusBadge status={user?.status} />
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
    );
}

export default React.memo(UserTable);