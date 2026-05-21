import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
import { Label } from '@/app/_components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/select';
import { Spinner } from '@/app/_components/ui/spinner';
import type { User, UserRole, UserStatus } from '@/types/domain';

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z
    .email('Invalid email format')
    .min(1, 'Email is required'),
  role: z.enum(['admin', 'manager', 'operator'], 'Please select a valid role'),
  status: z.enum(['active', 'inactive'], 'Please select a valid status'),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  mode: 'create' | 'edit';
  defaultValues?: User;
  onSubmit: (data: UserFormValues) => Promise<{ success: boolean; error?: string }>;
  onSuccess: () => void;
}

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'operator', label: 'Operator' },
];

const STATUS_OPTIONS: { value: UserStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

export default function UserForm({ mode, defaultValues, onSubmit, onSuccess }: UserFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: defaultValues?.name ?? '',
            email: defaultValues?.email ?? '',
            role: defaultValues?.role ?? undefined,
            status: defaultValues?.status ?? undefined,
        },
    });

  const handleFormSubmit = async (data: UserFormValues) => {
    const result = await onSubmit(data);

    if (result?.success) {
      onSuccess();
    } else {
      setError('root', { message: result?.error ?? 'Failed to save data. Please try again.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="space-y-4">
        {/* Submit Error */}
        {errors?.root && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                {errors?.root?.message}
            </div>
        )}

        {/* Name */}
        <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
                id="name"
                placeholder="Full name"
                {...register('name')}
                aria-invalid={errors?.name ? 'true' : undefined}
            />
            {errors?.name && (
                <p className="text-xs text-red-500">{errors?.name?.message}</p>
            )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                {...register('email')}
                aria-invalid={errors?.email ? 'true' : undefined}
            />
            {errors?.email && (
                <p className="text-xs text-red-500">{errors?.email?.message}</p>
            )}
        </div>

        <div className="flex items-center justify-between">
            {/* Role — Select */}
            <div className="space-y-1.5">
                <Label>Role</Label>
                <Select
                    onValueChange={(value) => setValue('role', value as UserRole, { shouldValidate: true })}
                    defaultValue={defaultValues?.role}
                >
                <SelectTrigger aria-invalid={errors?.role ? 'true' : undefined}>
                    <SelectValue placeholder="Choose role" />
                </SelectTrigger>
                <SelectContent>
                    {ROLE_OPTIONS.map((opt) => (
                        <SelectItem key={opt?.value} value={opt?.value}>
                            {opt?.label}
                        </SelectItem>
                    ))}
                </SelectContent>
                </Select>
                {errors?.role && (
                    <p className="text-xs text-red-500">{errors?.role?.message}</p>
                )}
            </div>

            {/* Status — Select */}
            <div className="space-y-1.5">
                <Label>Status</Label>
                <Select
                    onValueChange={(value) => setValue('status', value as UserStatus, { shouldValidate: true })}
                    defaultValue={defaultValues?.status}
                >
                <SelectTrigger aria-invalid={errors?.status ? 'true' : undefined}>
                    <SelectValue placeholder="Choose status" />
                </SelectTrigger>
                <SelectContent>
                    {STATUS_OPTIONS.map((opt) => (
                        <SelectItem key={opt?.value} value={opt?.value}>
                            {opt?.label}
                        </SelectItem>
                    ))}
                </SelectContent>
                </Select>
                {errors?.status && (
                    <p className="text-xs text-red-500">{errors?.status?.message}</p>
                )}
            </div>
        </div>

        {/* Submit */}
        <Button variant="slate" type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
                <span className="flex items-center gap-2">
                    <Spinner /> Saving data...
                </span>
            ) : (
                mode === 'create' ? 'Create User' : 'Update User'
            )}
        </Button>
    </form>
  );
}