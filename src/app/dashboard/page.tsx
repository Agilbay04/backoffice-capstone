import { Link } from 'react-router-dom';
import { useUserListQuery } from '@/app/users/_hooks/use-user-list-query';
import { useRequestListQuery } from '@/app/requests/_hooks/use-request-list-query';
import { useAuditLogListQuery } from '@/app/audit-logs/_hooks/use-audit-log-list-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/_components/ui/table';
import { Spinner } from '@/app/_components/ui/spinner';

export default function DashboardPage() {
  const { data: usersData, isLoading: usersLoading } = useUserListQuery({ page: 1, perPage: 1 });
  const { data: requestsData, isLoading: requestsLoading } = useRequestListQuery({ page: 1, perPage: 1 });
  const { data: auditData, isLoading: auditLoading } = useAuditLogListQuery({ page: 1, perPage: 5 });

  const isLoading = usersLoading || requestsLoading || auditLoading;

  const summaryCards = [
    {
      label: 'Total Users',
      value: usersData?.meta?.total ?? 0,
      color: 'bg-blue-50 border-blue-200 text-blue-700',
    },
    {
      label: 'Total Requests',
      value: requestsData?.meta?.total ?? 0,
      color: 'bg-amber-50 border-amber-200 text-amber-700',
    },
    {
      label: 'Audit Log Entries',
      value: auditData?.meta?.total ?? 0,
      color: 'bg-purple-50 border-purple-200 text-purple-700',
    },
  ];

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Overview of system activity.</p>
      </div>

      {isLoading ? (
        <div className="w-full h-64 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-3">
          <Spinner className="text-slate-900" />
          <span className="text-xs font-medium text-slate-400 animate-pulse">Loading dashboard...</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {summaryCards.map((card) => (
              <div
                key={card.label}
                className={`rounded-lg border shadow-sm p-6 ${card.color}`}
              >
                <p className="text-sm font-medium opacity-80">{card.label}</p>
                <p className="text-3xl font-bold mt-1">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
              <Link
                to="/audit-logs"
                className="text-sm text-blue-600 hover:underline"
              >
                View All Audit Logs &rarr;
              </Link>
            </div>

            {auditData?.items && auditData.items.length > 0 ? (
              <div className="w-full rounded-md border border-slate-200 overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500">Actor</TableHead>
                      <TableHead className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500">Action</TableHead>
                      <TableHead className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-500">Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditData.items.slice(0, 5).map((log) => (
                      <TableRow key={log.id} className="hover:bg-slate-50/70">
                        <TableCell className="px-4 py-3 text-sm text-slate-700">{log.actor}</TableCell>
                        <TableCell className="px-4 py-3 text-sm">
                          <span className="font-mono tracking-wide text-xs bg-slate-100 px-2 py-0.5 rounded">{log.action}</span>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-sm text-slate-400">{new Date(log.timestamp).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-sm text-slate-400 py-8 text-center">No recent activity.</p>
            )}
          </div>
        </>
      )}
    </main>
  );
}
