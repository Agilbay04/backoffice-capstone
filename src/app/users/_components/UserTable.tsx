import React from 'react';
import StatusBadge from '../../_components/StatusBadge';
import type { User } from '../../../types/domain';

interface UserTableProps {
  data: User[];
}

function UserTable({ data }: UserTableProps) {
    console.log(`UserTable is rendered with ${data?.length ?? 0} users`);

    return (
        <table className="w-full border-collapse bg-white text-left table-auto">
            <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Name</th>
                    <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Email</th>
                    <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Role</th>
                    <th className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
                {data?.length > 0 ? (
                    data?.map((user) => (
                        <tr key={user?.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">
                                {user?.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                                {user?.email}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600 font-mono tracking-wide">
                                {user?.role?.toUpperCase()}
                            </td>
                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                                <StatusBadge status={user?.status} />
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={4} className="px-6 py-10 text-center text-sm font-medium text-slate-400 bg-slate-25">
                            No users found.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default React.memo(UserTable);