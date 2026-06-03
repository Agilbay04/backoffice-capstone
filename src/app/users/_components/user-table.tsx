import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '@/app/_components/status-badge';
import type { IUser } from '@/types/domain';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/_components/ui/table';
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

interface IUserTableProps {
  data: IUser[];
  onDelete: (id: string) => Promise<void>;
  isDeleting?: boolean;
}

function UserTable({ data, onDelete, isDeleting }: IUserTableProps) {
    const navigate = useNavigate();
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleDelete = async () => {
        if (!deleteId) return;
        await onDelete(deleteId);
        setDeleteId(null);
    };

    return (
        <>
            <div className="w-full rounded-md border border-slate-200 bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead className="w-[20%] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Name</TableHead>
                            <TableHead className="w-[28%] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Email</TableHead>
                            <TableHead className="w-[15%] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Role</TableHead>
                            <TableHead className="w-[15%] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Status</TableHead>
                            <TableHead className="w-[22%] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.length > 0 ? (
                            data?.map((user) => (
                                <TableRow key={user?.id} className="hover:bg-slate-50/70 transition-colors">
                                    <TableCell className="px-6 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">
                                        <button
                                            className="hover:underline text-left"
                                            onClick={() => navigate(`/users/${user?.id}`)}
                                        >
                                            {user?.name}
                                        </button>
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
                                    <TableCell className="px-6 py-4 text-sm whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="xs"
                                                onClick={() => navigate(`/users/${user?.id}`)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="xs"
                                                onClick={() => setDeleteId(user?.id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-sm font-medium text-slate-400">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={!!deleteId} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete User</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this user? This action cannot be undone.
                        </DialogDescription>
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

export default React.memo(UserTable);
