import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/_components/ui/table';
import { Badge } from '@/app/_components/ui/badge';
import type { IAuditLog } from '@/types/domain';

interface AuditLogTableProps {
  data: IAuditLog[];
}

function AuditLogTable({ data }: AuditLogTableProps) {
    const navigate = useNavigate();

    return (
        <div className="w-full rounded-md border border-slate-200 bg-white shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-slate-50">
                    <TableRow>
                        <TableHead className="w-[15%] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Actor</TableHead>
                        <TableHead className="w-[15%] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Action</TableHead>
                        <TableHead className="w-[20%] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Target</TableHead>
                        <TableHead className="w-[30%] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Details</TableHead>
                        <TableHead className="w-[20%] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Timestamp</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.length > 0 ? (
                        data?.map((log) => (
                            <TableRow
                                key={log?.id}
                                className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                                onClick={() => navigate(`/audit-logs/${log?.id}`)}
                            >
                                <TableCell className="px-6 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">
                                    {log?.actor}
                                </TableCell>
                                <TableCell className="px-6 py-4 text-sm whitespace-nowrap">
                                    <Badge variant="outline" className="font-mono tracking-wide text-xs">
                                        {log?.action}
                                    </Badge>
                                </TableCell>
                                <TableCell className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                                    {log?.target ?? '—'}
                                </TableCell>
                                <TableCell className="px-6 py-4 text-sm text-slate-500">
                                    {log?.details ?? '—'}
                                </TableCell>
                                <TableCell className="px-6 py-4 text-sm text-slate-400 whitespace-nowrap">
                                    {new Date(log?.timestamp).toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="h-32 text-center text-sm font-medium text-slate-400">
                                No audit logs found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default React.memo(AuditLogTable);
