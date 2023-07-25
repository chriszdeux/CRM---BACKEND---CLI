import { Document } from "mongodb";
import mongoose from "mongoose";


interface InterfaceRegisterUser extends Document {
  name: string,
  email: string,
  password: string,
  createdAt: string,
  updatedAt: string,
  isActive: boolean
  gender?: boolean,
  locality: string,
}

const userRegisterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: false
  },
  genre: {
    type: String,
    enum: ['Male', 'Female', 'None'],
    required: false
  },
  locality: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const RegisterUser = mongoose.model<InterfaceRegisterUser>('UserRegister', userRegisterSchema)


export default RegisterUser