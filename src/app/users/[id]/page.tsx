import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@/app/users/_hooks/use-user';
import { useUpdateUser } from '@/app/users/_hooks/use-update-user';
import { useDeleteUser } from '@/app/users/_hooks/use-delete-user';
import StatusBadge from '@/app/_components/status-badge';
import { Button } from '@/app/_components/ui/button';
import { Spinner } from '@/app/_components/ui/spinner';
import { ApiClientError } from '@/api/client';
import type { IUser } from '@/types/domain';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/app/_components/ui/dialog';
import UserForm from '@/app/users/_components/user-form';

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useUser(id!);
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleEdit = async (formData: Partial<IUser>) => {
    if (!id) return { success: false };
    try {
      await updateMutation.mutateAsync({ id: id!, data: formData });
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof ApiClientError ? err.message : 'Failed to update user.',
      };
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    setIsDeleting(true);
    setDeleteError(null);

    try {
      await deleteMutation.mutateAsync(id);
      navigate('/users', { replace: true });
    } catch (err) {
      setDeleteError(
        err instanceof ApiClientError ? err.message : 'Failed to delete user.'
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
          <span className="text-xs font-medium text-slate-400 animate-pulse">Loading user...</span>
        </div>
      </main>
    );
  }

  if (error || !data?.data) {
    return (
      <main className="space-y-6">
        <div className="w-full h-64 bg-white rounded-lg border border-red-200 shadow-sm flex flex-col items-center justify-center gap-3">
          <span className="text-sm font-medium text-red-600">
            {error instanceof Error ? error?.message : 'User not found.'}
          </span>
          <Button variant="outline" size="sm" onClick={() => navigate('/users')}>
            Back to Users
          </Button>
        </div>
      </main>
    );
  }

  const user = data.data;

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/users')}>
            &larr; Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{user.name}</h1>
            <p className="text-sm text-slate-500 mt-1">User ID: {user.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-slate-900" onClick={() => setIsEditOpen(true)}>
            Edit User
          </Button>
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
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {deleteError}
        </div>
      )}

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Details</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Name</span>
              <p className="mt-1 text-sm text-slate-700">{user.name}</p>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Email</span>
              <p className="mt-1 text-sm text-slate-700">{user.email}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Role</span>
              <p className="mt-1 text-sm text-slate-700 font-mono tracking-wide">{user.role.toUpperCase()}</p>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Status</span>
              <div className="mt-1">
                <StatusBadge status={user.status} />
              </div>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Created At</span>
              <p className="mt-1 text-sm text-slate-700">{user.createdAt}</p>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user details below.</DialogDescription>
          </DialogHeader>
          <UserForm
            mode="edit"
            defaultValues={user}
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
