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
import { useRequest } from '../_hooks/use-request';
import { useUpdateRequest } from '../_hooks/use-update-request';
import { useDeleteRequest } from '../_hooks/use-delete-request';
import { useUpdateRequestStatus } from '../_hooks/use-update-request-status';
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

    const { data, isLoading, error } = useRequest(id!);
    const updateMutation = useUpdateRequest();
    const deleteMutation = useDeleteRequest();
    const statusMutation = useUpdateRequestStatus();

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);

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
        setIsUpdating(true);
        setUpdateError(null);
        try {
            await statusMutation.mutateAsync({ id, status: selectedStatus });
        } catch (err) {
            setUpdateError(err instanceof ApiClientError ? err.message : 'Failed to update status.');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (!id) return;
        setIsDeleting(true);
        setDeleteError(null);
        try {
            await deleteMutation.mutateAsync(id);
            navigate('/requests', { replace: true });
        } catch (err) {
            setDeleteError(
                err instanceof ApiClientError ? err.message : 'Failed to delete request.'
            );
        } finally {
            setIsDeleting(false);
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
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                </div>
            </div>

            {deleteError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{deleteError}</div>
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
                        {updateError && (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{updateError}</div>
                        )}
                        <Button className="bg-slate-900" onClick={handleStatusUpdate} disabled={isUpdating || selectedStatus === request.status}>
                            {isUpdating ? <span className="flex items-center gap-2"><Spinner /> Updating...</span> : 'Update Status'}
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
