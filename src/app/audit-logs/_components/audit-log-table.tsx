import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type SortingState,
  type ColumnDef,
} from '@tanstack/react-table';
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
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface IAuditLogTableProps {
  data: IAuditLog[];
}

function AuditLogTable({ data }: IAuditLogTableProps) {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<IAuditLog>[]>(() => [
    {
      accessorKey: 'actor',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-slate-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Actor
          {column.getIsSorted() === 'asc' ? <ArrowUp className="h-3 w-3" /> :
            column.getIsSorted() === 'desc' ? <ArrowDown className="h-3 w-3" /> :
            <ArrowUpDown className="h-3 w-3 text-slate-300" />}
        </button>
      ),
    },
    {
      accessorKey: 'action',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-slate-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Action
          {column.getIsSorted() === 'asc' ? <ArrowUp className="h-3 w-3" /> :
            column.getIsSorted() === 'desc' ? <ArrowDown className="h-3 w-3" /> :
            <ArrowUpDown className="h-3 w-3 text-slate-300" />}
        </button>
      ),
      cell: ({ row }) => (
        <Badge variant="outline" className="font-mono tracking-wide text-xs">
          {row.original.action}
        </Badge>
      ),
    },
    {
      accessorKey: 'target',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-slate-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Target
          {column.getIsSorted() === 'asc' ? <ArrowUp className="h-3 w-3" /> :
            column.getIsSorted() === 'desc' ? <ArrowDown className="h-3 w-3" /> :
            <ArrowUpDown className="h-3 w-3 text-slate-300" />}
        </button>
      ),
      cell: ({ row }) => row.original.target ?? '\u2014',
    },
    {
      accessorKey: 'details',
      header: 'Details',
      cell: ({ row }) => row.original.details ?? '\u2014',
    },
    {
      accessorKey: 'timestamp',
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-slate-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Timestamp
          {column.getIsSorted() === 'asc' ? <ArrowUp className="h-3 w-3" /> :
            column.getIsSorted() === 'desc' ? <ArrowDown className="h-3 w-3" /> :
            <ArrowUpDown className="h-3 w-3 text-slate-300" />}
        </button>
      ),
      cell: ({ row }) => new Date(row.original.timestamp).toLocaleString(),
    },
  ], []);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
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
              <TableRow
                key={row.id}
                className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                onClick={() => navigate(`/audit-logs/${row.original.id}`)}
              >
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
