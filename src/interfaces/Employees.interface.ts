import { generalInfoInterface } from "./GeneralInfo.interface";

export interface employeeInterfaces extends generalInfoInterface {
  role: 'god' | 'admin' | 'employee';
  permissions: ('read' | 'write' | 'create' | 'delete')[];
}
