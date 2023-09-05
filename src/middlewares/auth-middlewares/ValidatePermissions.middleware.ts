import { Request, Response, NextFunction } from 'express';
import { employeesModel } from '../../models';

export const ValidatePermissions = async (req: Request, res: Response, next: NextFunction ) => {
  const token = req.headers['authorization'];

  try {
      const employee = await employeesModel.findOne({authToken: token})
      if(employee) {
        if (employee.role !== 'god' && employee.role !== 'admin') {
          return res.status(403).json({ message: 'No tienes permiso para realizar esta acción.' });
        }
        const requiredPermissions: ('read' | 'write' | 'create' | 'delete')[] = ['read', 'write'];
        const hasRequiredPermissions = requiredPermissions.every(permission => employee.permissions.includes(permission));
        if (!hasRequiredPermissions) {
          return res.status(403).json({ message: 'No tienes los permisos necesarios para realizar esta acción.' });
        }
        next();
      }
    
  } catch (error) {
    console.log(error)
  }

}

