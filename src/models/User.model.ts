import mongoose, { Schema, mongo } from "mongoose";
import { userInterface } from "../interfaces";

export const userSchema = new Schema<userInterface>({
  name: {
    type: String,
    required: true,
  },
  lastName: {
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
  birthday: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true
  },
  experienceLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Not Specified'],
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  profileImage: {
    type: String,
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
  },
  createdAt: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  confirmedAccount: {
    type :Boolean ,
    required: true,
    default: false
  },
  confirmCode: {
    type: String
  },
  credits: {
    type: Number
  },
  portfolio: {
    crypto: [
      {
        id: {
          type: String,
          required: false,
        },
        name: {
          type: String,
          required: false,
        },
        amount: {
          type: Number,
          required: false,
        },
      },
    ],
  },
})

export const usersModel = mongoose.model<userInterface>('users',userSchema)