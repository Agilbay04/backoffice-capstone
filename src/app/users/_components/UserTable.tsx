import React from 'react';
import StatusBadge from '@/app/_components/StatusBadge';
import type { User } from '@/types/domain';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";

interface UserTableProps {
  data: User[];
}

function UserTable({ data }: UserTableProps) {
    console.log(`UserTable is rendered with ${data?.length ?? 0} users`);

    return (
        <div className="w-full rounded-md border border-slate-200 bg-white shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-slate-50">
                    <TableRow>
                        <TableHead className="w-[25%] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Name</TableHead>
                        <TableHead className="w-[35%] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Email</TableHead>
                        <TableHead className="w-[20%] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Role</TableHead>
                        <TableHead className="w-[20%] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.length > 0 ? (
                        data?.map((user) => (
                            <TableRow key={user?.id} className="hover:bg-slate-50/70 transition-colors">
                                <TableCell className="px-6 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">
                                    {user?.name}
                                </TableCell>
                                <TableCell className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                                    {user?.email}
                                </TableCell>
                                <TableCell className="px-6 py-4 text-sm text-slate-600 font-mono tracking-wide">
                                    {user?.role?.toUpperCase()}
                                </TableCell>
                                <TableCell className="px-6 py-4 text-sm whitespace-nowrap">
                                    <StatusBadge status={user?.status} />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="h-32 text-center text-sm font-medium text-slate-400">
                                No users found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default React.memo(UserTable);