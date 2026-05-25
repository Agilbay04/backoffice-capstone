import React from 'react';
import { Badge } from '@/app/_components/ui/badge';

interface RequestStatusBadgeProps {
    status: string;
}

const VARIANT_MAP: Record<string, 'green' | 'secondary' | 'destructive'> = {
    approved: 'green',
    pending: 'secondary',
    rejected: 'destructive',
};

function RequestStatusBadge({ status }: RequestStatusBadgeProps) {
    const variant = VARIANT_MAP[status] ?? 'secondary';

    return (
        <Badge
            variant={variant}
            className="capitalize px-2.5 py-0.5 tracking-wide font-semibold rounded-full"
        >
            {status}
        </Badge>
    );
}

export default React.memo(RequestStatusBadge);
