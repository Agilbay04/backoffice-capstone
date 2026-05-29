import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestStatusBadge from '@/app/requests/_components/request-status-badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/_components/ui/table';
import { Badge } from '@/app/_components/ui/badge';
import { Button } from '@/app/_components/ui/button';
import { Spinner } from '@/app/_components/ui/spinner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/app/_components/ui/dialog';
import type { IRequest } from '@/types/domain';

interface RequestTableProps {
  data: IRequest[];
  onDelete: (id: string) => Promise<void>;
}

const PRIORITY_VARIANT: Record<string, 'destructive' | 'default' | 'secondary' | 'outline'> = {
    critical: 'destructive',
    high: 'default',
    medium: 'secondary',
    low: 'outline',
};

function RequestTable({ data, onDelete }: RequestTableProps) {
    const navigate = useNavigate();
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!deleteId) return;
        setIsDeleting(true);
        try {
            await onDelete(deleteId);
            setDeleteId(null);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div className="w-full rounded-md border border-slate-200 bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="w-[20%] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Title</TableHead>
                            <TableHead className="w-[12%] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Status</TableHead>
                            <TableHead className="w-[10%] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Priority</TableHead>
                            <TableHead className="w-[15%] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Requested By</TableHead>
                            <TableHead className="w-[13%] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Assignee</TableHead>
                            <TableHead className="w-[12%] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Created At</TableHead>
                            <TableHead className="w-[18%] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.length > 0 ? (
                            data?.map((request) => (
                                <TableRow key={request?.id} className="hover:bg-slate-50/70 transition-colors">
                                    <TableCell className="px-6 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">
                                        <button
                                            className="hover:underline text-left"
                                            onClick={() => navigate(`/requests/${request?.id}`)}
                                        >
                                            {request?.title}
                                        </button>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-sm whitespace-nowrap">
                                        <RequestStatusBadge status={request?.status} />
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-sm whitespace-nowrap">
                                        <Badge
                                            variant={PRIORITY_VARIANT[request?.priority] ?? 'secondary'}
                                            className="capitalize px-2.5 py-0.5 tracking-wide font-semibold rounded-full"
                                        >
                                            {request?.priority}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                                        {request?.requestedBy}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                                        {request?.assignee ?? '—'}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-sm text-slate-400 whitespace-nowrap">
                                        {new Date(request?.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 text-sm whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="xs"
                                                onClick={() => navigate(`/requests/${request?.id}`)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="xs"
                                                onClick={() => setDeleteId(request?.id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-32 text-center text-sm font-medium text-slate-400">
                                    No requests found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={!!deleteId} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Request</DialogTitle>
                        <DialogDescription>Are you sure? This action cannot be undone.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteId(null)} disabled={isDeleting}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? (
                                <span className="flex items-center gap-2"><Spinner /> Deleting...</span>
                            ) : 'Delete'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default React.memo(RequestTable);
