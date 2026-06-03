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
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface IRequestTableProps {
  data: IRequest[];
  onDelete: (id: string) => Promise<void>;
  isDeleting?: boolean;
}

const PRIORITY_VARIANT: Record<string, 'destructive' | 'default' | 'secondary' | 'outline'> = {
  critical: 'destructive',
  high: 'default',
  medium: 'secondary',
  low: 'outline',
};

function RequestTable({ data, onDelete, isDeleting }: IRequestTableProps) {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<IRequest>[]>(() => [
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-slate-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          {column.getIsSorted() === 'asc' ? <ArrowUp className="h-3 w-3" /> :
            column.getIsSorted() === 'desc' ? <ArrowDown className="h-3 w-3" /> :
            <ArrowUpDown className="h-3 w-3 text-slate-300" />}
        </button>
      ),
      cell: ({ row }) => (
        <button
          className="hover:underline text-left font-medium text-slate-900 cursor-pointer"
          onClick={() => navigate(`/requests/${row.original.id}`)}
        >
          {row.original.title}
        </button>
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
      cell: ({ row }) => <RequestStatusBadge status={row.original.status} />,
    },
    {
      accessorKey: 'priority',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-slate-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Priority
          {column.getIsSorted() === 'asc' ? <ArrowUp className="h-3 w-3" /> :
            column.getIsSorted() === 'desc' ? <ArrowDown className="h-3 w-3" /> :
            <ArrowUpDown className="h-3 w-3 text-slate-300" />}
        </button>
      ),
      cell: ({ row }) => (
        <Badge
          variant={PRIORITY_VARIANT[row.original.priority] ?? 'secondary'}
          className="capitalize px-2.5 py-0.5 tracking-wide font-semibold rounded-full"
        >
          {row.original.priority}
        </Badge>
      ),
    },
    {
      accessorKey: 'requestedBy',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-slate-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Requested By
          {column.getIsSorted() === 'asc' ? <ArrowUp className="h-3 w-3" /> :
            column.getIsSorted() === 'desc' ? <ArrowDown className="h-3 w-3" /> :
            <ArrowUpDown className="h-3 w-3 text-slate-300" />}
        </button>
      ),
    },
    {
      accessorKey: 'assignee',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-slate-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Assignee
          {column.getIsSorted() === 'asc' ? <ArrowUp className="h-3 w-3" /> :
            column.getIsSorted() === 'desc' ? <ArrowDown className="h-3 w-3" /> :
            <ArrowUpDown className="h-3 w-3 text-slate-300" />}
        </button>
      ),
      cell: ({ row }) => row.original.assignee ?? '\u2014',
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-slate-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created At
          {column.getIsSorted() === 'asc' ? <ArrowUp className="h-3 w-3" /> :
            column.getIsSorted() === 'desc' ? <ArrowDown className="h-3 w-3" /> :
            <ArrowUpDown className="h-3 w-3 text-slate-300" />}
        </button>
      ),
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={() => navigate(`/requests/${row.original.id}`)}
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
                <TableRow key={row.id} className="hover:bg-slate-50/70 transition-colors cursor-pointer">
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
