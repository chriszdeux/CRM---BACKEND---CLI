import { PersonInterface } from "./Person.interface";

export interface EmployeeInterfaces extends PersonInterface {
  role: 'god' | 'admin' | 'employee';
  active: boolean;
  permissions: ('read' | 'write' | 'create' | 'delete')[];
  createdAt: string;
  profileImage?: string,
  isLogged: boolean,
  lastLogin?: string,
  authToken?: string
}
