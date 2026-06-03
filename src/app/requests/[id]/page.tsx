import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RequestStatusBadge from '@/app/requests/_components/request-status-badge';
import { Badge } from '@/app/_components/ui/badge';
import { Button } from '@/app/_components/ui/button';
import { Spinner } from '@/app/_components/ui/spinner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/app/_components/ui/dialog';
import { ApiClientError } from '@/api/client';
import type { IRequest } from '@/types/domain';
import { MOCK_STATUSES } from '../_mocks/statuses';
import { useRequestQuery } from '../_hooks/use-request-query';
import { useUpdateRequestMutation } from '../_hooks/use-update-request-mutation';
import { useDeleteRequestMutation } from '../_hooks/use-delete-request-mutation';
import { useUpdateRequestStatusMutation } from '../_hooks/use-update-request-status-mutation';
import RequestForm from '../_components/request-form';

const PRIORITY_VARIANT: Record<string, 'destructive' | 'default' | 'secondary' | 'outline'> = {
    critical: 'destructive',
    high: 'default',
    medium: 'secondary',
    low: 'outline',
};

export default function RequestDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data, isLoading, error } = useRequestQuery(id!);
    const updateMutation = useUpdateRequestMutation();
    const deleteMutation = useDeleteRequestMutation();
    const statusMutation = useUpdateRequestStatusMutation();

    const [isEditOpen, setIsEditOpen] = useState(false);

    const [selectedStatus, setSelectedStatus] = useState<string>('');

    const handleEdit = async (formData: Partial<IRequest>) => {
        if (!id) return { success: false };
        try {
            await updateMutation.mutateAsync({ id, data: formData });
            return { success: true };
        } catch (err) {
            return {
                success: false,
                error: err instanceof ApiClientError ? err.message : 'Failed to update request.',
            };
        }
    };

    const handleStatusUpdate = async () => {
        if (!id || !selectedStatus || selectedStatus === data?.data?.status) return;
        await statusMutation.mutateAsync({ id, status: selectedStatus });
    };

    const handleDelete = async () => {
        if (!id) return;
        try {
            await deleteMutation.mutateAsync(id);
            navigate('/requests', { replace: true });
        } catch {
            // Already handled by mutation error state
        }
    };

    if (isLoading) {
        return (
            <main className="space-y-6">
                <div className="w-full h-64 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-3">
                    <Spinner className="text-slate-900" />
                    <span className="text-xs font-medium text-slate-400 animate-pulse">Loading request...</span>
                </div>
            </main>
        );
    }

    if (error || !data?.data) {
        return (
            <main className="space-y-6">
                <div className="w-full h-64 bg-white rounded-lg border border-red-200 shadow-sm flex flex-col items-center justify-center gap-3">
                    <span className="text-sm font-medium text-red-600">{error instanceof Error ? error.message : 'Request not found.'}</span>
                    <Button variant="outline" size="sm" onClick={() => navigate('/requests')}>Back to Requests</Button>
                </div>
            </main>
        );
    }

    const request = data.data;

    return (
        <main className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" onClick={() => navigate('/requests')}>&larr; Back</Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{request.title}</h1>
                        <p className="text-sm text-slate-500 mt-1">Request ID: {request.id}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button className="bg-slate-900" onClick={() => setIsEditOpen(true)}>Edit</Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={deleteMutation.isPending}
                    >
                        {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                </div>
            </div>

            {deleteMutation.isError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {deleteMutation.error instanceof ApiClientError
                        ? deleteMutation.error.message
                        : 'Failed to delete request.'}
                </div>
            )}

            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-slate-900">Details</h2>
                    <div className="space-y-3">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Status</span>
                            <div className="mt-1"><RequestStatusBadge status={request.status} /></div>
                        </div>
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Priority</span>
                            <div className="mt-1">
                                <Badge variant={PRIORITY_VARIANT[request.priority] ?? 'secondary'} className="capitalize px-2.5 py-0.5 tracking-wide font-semibold rounded-full">
                                    {request.priority}
                                </Badge>
                            </div>
                        </div>
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Requested By</span>
                            <p className="mt-1 text-sm text-slate-700">{request.requestedBy}</p>
                        </div>
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Assignee</span>
                            <p className="mt-1 text-sm text-slate-700">{request.assignee ?? '—'}</p>
                        </div>
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Created At</span>
                            <p className="mt-1 text-sm text-slate-700">{new Date(request.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-4">
                    <h2 className="text-lg font-semibold text-slate-900">Update Status</h2>
                    <div className="space-y-3">
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">New Status</label>
                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger className="w-full mt-1">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {MOCK_STATUSES.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value}>{opt.value}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {statusMutation.isError && (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {statusMutation.error instanceof ApiClientError
                                    ? statusMutation.error.message
                                    : 'Failed to update status.'}
                            </div>
                        )}
                        <Button className="bg-slate-900" onClick={handleStatusUpdate} disabled={statusMutation.isPending || selectedStatus === request.status}>
                            {statusMutation.isPending ? <span className="flex items-center gap-2"><Spinner /> Updating...</span> : 'Update Status'}
                        </Button>
                    </div>
                </div>
            </div>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Request</DialogTitle>
                        <DialogDescription>Update request details below.</DialogDescription>
                    </DialogHeader>
                    <RequestForm
                        mode="edit"
                        defaultValues={request}
                        onSubmit={handleEdit}
                        onSuccess={() => {
                            setIsEditOpen(false);
                        }}
                    />
                </DialogContent>
            </Dialog>
        </main>
    );
}
