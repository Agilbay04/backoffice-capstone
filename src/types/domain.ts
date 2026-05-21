export type UserRole = 'admin' | 'operator' | 'manager';
export type UserStatus = 'active' | 'inactive';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    password: string;
    createdAt: string;
}

export interface Role {
    id: string;
    name: string;
}

export interface Menu {
    id: string;
    name: string;
    url: string;
    icon: string;
}

export interface DropdownOption {
    key: string;
    value: string;
}

export interface AuthRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
}

export interface Request {
    id: string;
    title: string;
    status: 'pending' | 'approved' | 'rejected';
    requestedBy: string;
    createdAt: string;
}

export interface AuditLog {
    id: string;
    actor: string;
    action: string;
    timestamp: string;
}
