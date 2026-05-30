// === Types ===
export type TUserRole = 'super-admin' | 'admin' | 'operator' | 'manager';
export type TUserStatus = 'active' | 'inactive';
export type TRequestStatus = 'pending' | 'approved' | 'rejected';
export type TRequestPriority = 'low' | 'medium' | 'high' | 'critical';

export type TBaseParams = {
    search?: string;
    page: number;
    perPage: number;
};


// === Interfaces ===
export interface IUser {
    id: string;
    name: string;
    email: string;
    role: TUserRole;
    status: TUserStatus;
    password: string;
    createdAt: string;
}

export interface IRole {
    id: string;
    code: string;
    name: string;
}

export interface IMenu {
    id: string;
    name: string;
    url: string;
    icon: string;
}

export interface IDropdownOption {
    key: string;
    value: string;
}

export interface IAuthRequest {
    email: string;
    password: string;
}

export interface IAuthResponse {
    id: string;
    name: string;
    email: string;
    role: TUserRole;
    status: TUserStatus;
}

export interface IRequest {
    id: string;
    title: string;
    status: TRequestStatus;
    priority: TRequestPriority;
    requestedBy: string;
    assignee: string | null;
    createdAt: string;
}

export interface IAuditLog {
    id: string;
    actor: string;
    action: string;
    target?: string;
    timestamp: string;
    details?: string;
}
