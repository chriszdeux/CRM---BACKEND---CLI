import { GeneralInfoInterface } from "./GeneralInfo.interface";

export interface EmployeeInterfaces extends GeneralInfoInterface {
  role: 'god' | 'admin' | 'employee';
  permissions: ('read' | 'write' | 'create' | 'delete')[];
}
