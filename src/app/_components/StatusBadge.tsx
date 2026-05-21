import React from "react";
import type { UserStatus } from "@/types/domain";
import { Badge } from "@/app/_components/ui/badge";

interface StatusBadgeProps {
    status: UserStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
    console.log(`StatusBadge [${status}] is rendered`);

    const getBadgeVariant = () => {
        switch (status) {
            case 'active':
                return 'green';
            case 'inactive':
                return 'secondary';
            default:
                return 'default';
        } 
    };

    return (
        <Badge 
            variant={getBadgeVariant()} 
            className="capitalize px-2.5 py-0.5 tracking-wide font-semibold rounded-full"
        >
            {status}
        </Badge>
    );
}

export default React.memo(StatusBadge);