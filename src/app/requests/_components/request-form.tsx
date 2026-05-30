import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/app/_components/ui/button';
import { FormInput } from '@/app/_components/ui/form-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/select';
import { Spinner } from '@/app/_components/ui/spinner';
import type { IRequest } from '@/types/domain';
import { MOCK_STATUSES } from '@/app/requests/_mocks/statuses';
import { MOCK_PRIORITIES } from '@/app/requests/_mocks/priorities';

const requestSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  requestedBy: z.string().min(5, 'Requester is required'),
  assignee: z.string().optional(),
  status: z.enum(['pending', 'approved', 'rejected'], 'Please select a valid status'),
  priority: z.enum(['low', 'medium', 'high', 'critical'], 'Please select a valid priority'),
});

type RequestFormValues = z.infer<typeof requestSchema>;

interface RequestFormProps {
  mode: 'create' | 'edit';
  defaultValues?: IRequest;
  onSubmit: (data: RequestFormValues) => Promise<{ success: boolean; error?: string }>;
  onSuccess: () => void;
}

export default function RequestForm({ mode, defaultValues, onSubmit, onSuccess }: RequestFormProps) {
    const {
        register,
        handleSubmit,
        control,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<RequestFormValues>({
        resolver: zodResolver(requestSchema),
        defaultValues: {
            title: defaultValues?.title ?? '',
            requestedBy: defaultValues?.requestedBy ?? '',
            assignee: defaultValues?.assignee ?? '',
            status: defaultValues?.status ?? undefined,
            priority: defaultValues?.priority ?? undefined,
        },
    });

  const handleFormSubmit = async (data: RequestFormValues) => {
    const result = await onSubmit(data);

    if (result?.success) {
      onSuccess();
    } else {
      setError('root', { message: result?.error ?? 'Failed to save data. Please try again.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="space-y-4">
        {errors?.root && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                {errors?.root?.message}
            </div>
        )}

        <FormInput
            label="Title"
            placeholder="Request title"
            error={errors?.title?.message}
            {...register('title')}
        />

        <FormInput
            label="Requested By"
            placeholder="Requester name"
            error={errors?.requestedBy?.message}
            {...register('requestedBy')}
        />

        <FormInput
            label="Assignee"
            placeholder="Assignee name (optional)"
            error={errors?.assignee?.message}
            {...register('assignee')}
        />

        <div className="flex items-center justify-between gap-4">
            <div className="flex-1 space-y-1.5">
                <label className="text-sm font-medium">Status</label>
                <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger
                                aria-invalid={errors?.status ? "true" : undefined}
                                ref={field.ref}
                            >
                                <SelectValue placeholder="Choose status" />
                            </SelectTrigger>
                            <SelectContent>
                                {MOCK_STATUSES.map((opt) => (
                                    <SelectItem key={opt.key} value={opt.value}>
                                        {opt.value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors?.status && (
                    <p className="text-xs text-red-500">{errors?.status?.message}</p>
                )}
            </div>

            <div className="flex-1 space-y-1.5">
                <label className="text-sm font-medium">Priority</label>
                <Controller
                    control={control}
                    name="priority"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger
                                aria-invalid={errors?.priority ? "true" : undefined}
                                ref={field.ref}
                            >
                                <SelectValue placeholder="Choose priority" />
                            </SelectTrigger>
                            <SelectContent>
                                {MOCK_PRIORITIES.map((opt) => (
                                    <SelectItem key={opt.key} value={opt.value}>
                                        {opt.value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors?.priority && (
                    <p className="text-xs text-red-500">{errors?.priority?.message}</p>
                )}
            </div>
        </div>

        <Button type="submit" className="w-full bg-slate-900" disabled={isSubmitting}>
            {isSubmitting ? (
                <span className="flex items-center gap-2">
                    <Spinner /> Saving data...
                </span>
            ) : (
                mode === 'create' ? 'Create Request' : 'Update Request'
            )}
        </Button>
    </form>
  );
}
