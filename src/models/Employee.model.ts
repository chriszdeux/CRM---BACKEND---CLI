import mongoose, { Schema } from 'mongoose';
import { employeeInterfaces } from '../interfaces';

const employeeSchema = new Schema<employeeInterfaces>({
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

export const employeesModel = mongoose.model<employeeInterfaces>('employees', employeeSchema);