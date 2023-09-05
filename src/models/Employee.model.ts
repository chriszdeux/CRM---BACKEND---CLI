import mongoose, { Schema } from 'mongoose';
import { EmployeeInterfaces } from '../interfaces';

const EmployeeSchema = new Schema<EmployeeInterfaces>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['god', 'admin', 'employee'],
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  permissions: {
    type: [String],
    enum: ['read', 'write', 'create', 'delete'],
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: true,
  },
  authToken: {
    type: String,
    required: true
  },
  isLogged: {
    type: Boolean,
    default: false,
    require: true
  },
  lastLogin: {
    type: String,
    required: false
  }
});

export const EmployeesModel = mongoose.model<EmployeeInterfaces>('employees', EmployeeSchema);