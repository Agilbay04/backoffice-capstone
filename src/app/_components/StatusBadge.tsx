import React from "react";
import type { UserStatus } from "../../types/domain";

interface StatusBadgeProps {
    status: UserStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
    console.log(`StatusBadge [${status}] is rendered`);

    const getBadgeClass = () => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'inactive':
                return 'bg-slate-100 text-slate-600';
            default:
                return 'bg-amber-100 text-amber-800';
        } 
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${getBadgeClass()}`}>
            {status.toUpperCase()}
        </span>
    );
}

export default React.memo(StatusBadge);