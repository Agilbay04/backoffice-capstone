import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { requestsApi } from '@/api/requests/requests';
import RequestStatusBadge from '@/app/requests/_components/request-status-badge';
import { Badge } from '@/app/_components/ui/badge';
import { Button } from '@/app/_components/ui/button';
import { Spinner } from '@/app/_components/ui/spinner';
import { FormInput } from '@/app/_components/ui/form-input';
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
  DialogFooter,
} from '@/app/_components/ui/dialog';
import { ApiClientError } from '@/api/client';
import type { IRequest } from '@/types/domain';

const STATUS_OPTIONS = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
];

const PRIORITY_OPTIONS = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' },
];

const PRIORITY_VARIANT: Record<string, 'destructive' | 'default' | 'secondary' | 'outline'> = {
    critical: 'destructive',
    high: 'default',
    medium: 'secondary',
    low: 'outline',
};

export default function RequestDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [request, setRequest] = useState<IRequest | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editPriority, setEditPriority] = useState('');
    const [editRequestedBy, setEditRequestedBy] = useState('');
    const [editAssignee, setEditAssignee] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [editError, setEditError] = useState<string | null>(null);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        let cancelled = false;

        const fetchRequest = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await requestsApi.getById(id);
                if (!cancelled) {
                    const resData = response.data as IRequest;
                    setRequest(resData);
                    setSelectedStatus(resData.status);
                    setEditTitle(resData.title);
                    setEditPriority(resData.priority);
                    setEditRequestedBy(resData.requestedBy);
                    setEditAssignee(resData.assignee ?? '');
                }
            } catch (err) {
                if (!cancelled) {
                    if (err instanceof ApiClientError) {
                        setError(err.message);
                    } else {
                        setError('Failed to load request.');
                    }
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        };

        fetchRequest();

        return () => {
            cancelled = true;
        };
    }, [id]);

    const handleStatusUpdate = async () => {
        if (!id || !selectedStatus || selectedStatus === request?.status) return;

        setIsUpdating(true);
        setUpdateError(null);

        try {
            const response = await requestsApi.updateStatus(id, selectedStatus);
            setRequest(response.data as IRequest);
        } catch (err) {
            if (err instanceof ApiClientError) {
                setUpdateError(err.message);
            } else {
                setUpdateError('Failed to update status.');
            }
        } finally {
            setIsUpdating(false);
        }
    };

    const handleEditSave = async () => {
        if (!id) return;
        setIsSaving(true);
        setEditError(null);

        try {
            const response = await requestsApi.update(id, {
                title: editTitle,
                priority: editPriority as IRequest['priority'],
                requestedBy: editRequestedBy,
                assignee: editAssignee || null,
            });

            const resData = response.data as IRequest;
            setRequest(resData);
            setSelectedStatus(resData.status);
            setIsEditOpen(false);
        } catch (err) {
            if (err instanceof ApiClientError) {
                setEditError(err.message);
            } else {
                setEditError('Failed to update request.');
            }
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!id) return;
        setIsDeleting(true);
        setDeleteError(null);

        try {
            await requestsApi.delete(id);
            navigate('/requests', { replace: true });
        } catch (err) {
            if (err instanceof ApiClientError) {
                setDeleteError(err.message);
            } else {
                setDeleteError('Failed to delete request.');
            }
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

    if (error || !request) {
        return (
            <main className="space-y-6">
                <div className="w-full h-64 bg-white rounded-lg border border-red-200 shadow-sm flex flex-col items-center justify-center gap-3">
                    <span className="text-sm font-medium text-red-600">{error ?? 'Request not found.'}</span>
                    <Button variant="outline" size="sm" onClick={() => navigate('/requests')}>Back to Requests</Button>
                </div>
            </main>
        );
    }

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
                    <Button variant="destructive" onClick={() => setIsDeleteOpen(true)}>Delete</Button>
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
                                    {STATUS_OPTIONS.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
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
                    <div className="space-y-4">
                        {editError && (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{editError}</div>
                        )}
                        <FormInput label="Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Request title" />
                        <FormInput label="Requested By" value={editRequestedBy} onChange={(e) => setEditRequestedBy(e.target.value)} placeholder="Requester name" />
                        <FormInput label="Assignee" value={editAssignee} onChange={(e) => setEditAssignee(e.target.value)} placeholder="Assignee name" />
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">Priority</label>
                            <Select value={editPriority} onValueChange={setEditPriority}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PRIORITY_OPTIONS.map((opt) => (
                                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className="w-full bg-slate-900" onClick={handleEditSave} disabled={isSaving}>
                            {isSaving ? <span className="flex items-center gap-2"><Spinner /> Saving...</span> : 'Save Changes'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Request</DialogTitle>
                        <DialogDescription>Are you sure? This action cannot be undone.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)} disabled={isDeleting}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? <span className="flex items-center gap-2"><Spinner /> Deleting...</span> : 'Delete'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </main>
    );
}
