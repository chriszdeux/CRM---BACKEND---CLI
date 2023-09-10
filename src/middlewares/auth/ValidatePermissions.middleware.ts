import { Request, Response, NextFunction } from 'express';
import { EmployeesModel } from '../../models';

export const ValidatePermissions = async (req: Request, res: Response, next: NextFunction ) => {
  const token = req.headers['authorization'];

  try {
      const employee = await EmployeesModel.findOne({authToken: token})
      if(employee) {
        if (employee.role !== 'god' && employee.role !== 'admin') {
          return res.status(403).json({ message: 'You do not have permission to perform this action.' });
        }
        const requiredPermissions: ('read' | 'write' | 'create' | 'delete')[] = ['read', 'write'];
        const hasRequiredPermissions = requiredPermissions.every(permission => employee.permissions.includes(permission));
        if (!hasRequiredPermissions) {
          return res.status(403).json({ message: 'You do not have the necessary permissions to perform this action.' });
        }
        next();
      }
    
  } catch (error) {
    return res.status(500).json({message: 'Cannot validate permissions'})
  }

}
