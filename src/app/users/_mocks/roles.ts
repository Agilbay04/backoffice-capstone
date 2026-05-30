import type { IRole } from "@/types/domain";

export const MOCK_ROLES: IRole[] = [
  { 
    id: '1', 
    code: 'super-admin', 
    name: 'Super Admin' 
  },
  { 
    id: '2', 
    code: 'admin', 
    name: 'Admin' 
  },
  { 
    id: '3', 
    code: 'manager', 
    name: 'Manager' 
  },
  { 
    id: '4', 
    code: 'operator', 
    name: 'Operator' 
  },
];