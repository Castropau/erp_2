export interface User {
  id: number; // id as an integer
  full_name: string; // full_name as a string
  department: Department
  role: Role;
  is_active: boolean;
  is_superuser: boolean;
  first_name: string;
  last_name: string;
  middle_name: string;
  username: string;
  contact_number: string;
  email: string;
  address: string;
}

interface Department {
    id: number,
    department: string
}

interface Role {
    id: number
    role: string
}