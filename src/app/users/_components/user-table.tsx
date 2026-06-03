import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type SortingState,
  type ColumnDef,
} from '@tanstack/react-table';
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
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface IUserTableProps {
  data: IUser[];
  onDelete: (id: string) => Promise<void>;
  isDeleting?: boolean;
}

function UserTable({ data, onDelete, isDeleting }: IUserTableProps) {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<IUser>[]>(() => [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-slate-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          {column.getIsSorted() === 'asc' ? <ArrowUp className="h-3 w-3" /> :
            column.getIsSorted() === 'desc' ? <ArrowDown className="h-3 w-3" /> :
            <ArrowUpDown className="h-3 w-3 text-slate-300" />}
        </button>
      ),
      cell: ({ row }) => (
        <button
          className="hover:underline text-left font-medium text-slate-900"
          onClick={() => navigate(`/users/${row.original.id}`)}
        >
          {row.original.name}
        </button>
      ),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-slate-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          {column.getIsSorted() === 'asc' ? <ArrowUp className="h-3 w-3" /> :
            column.getIsSorted() === 'desc' ? <ArrowDown className="h-3 w-3" /> :
            <ArrowUpDown className="h-3 w-3 text-slate-300" />}
        </button>
      ),
    },
    {
      accessorKey: 'role',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-slate-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Role
          {column.getIsSorted() === 'asc' ? <ArrowUp className="h-3 w-3" /> :
            column.getIsSorted() === 'desc' ? <ArrowDown className="h-3 w-3" /> :
            <ArrowUpDown className="h-3 w-3 text-slate-300" />}
        </button>
      ),
      cell: ({ row }) => (
        <span className="font-mono tracking-wide">{row.original.role.toUpperCase()}</span>
      ),
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-slate-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          {column.getIsSorted() === 'asc' ? <ArrowUp className="h-3 w-3" /> :
            column.getIsSorted() === 'desc' ? <ArrowDown className="h-3 w-3" /> :
            <ArrowUpDown className="h-3 w-3 text-slate-300" />}
        </button>
      ),
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={() => navigate(`/users/${row.original.id}`)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="xs"
            onClick={() => setDeleteId(row.original.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ], [navigate]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

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
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} className="hover:bg-slate-50/70 transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="px-6 py-4 text-sm whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-sm font-medium text-slate-400">
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
