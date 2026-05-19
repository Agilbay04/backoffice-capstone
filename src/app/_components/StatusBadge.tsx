import React from "react";
import type { UserStatus } from "../../types/domain";

interface StatusBadgeProps {
    status: UserStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
    console.log(`StatusBadge [${status}] is rendered`);

    const getBadgeStyle = () => {
        switch (status) {
            case 'active':
                return { backgroundColor: '#dcfce7', color: '#166534' }
            case 'inactive':
                return { backgroundColor: '#f1f5f9', color: '#475569' }
            default:
                return { backgroundColor: '#e2e8f0', color: '#1e293b' }
        } 
    };

    return (
        <span style={{
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
            ...getBadgeStyle()
        }}>
            {status.toUpperCase()}
        </span>
    );
}

export default React.memo(StatusBadge);
