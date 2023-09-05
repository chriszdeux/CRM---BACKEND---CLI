import mongoose, { Schema } from "mongoose";
import { sessionInterface } from "../../interfaces";

const sessionSchema = new Schema<sessionInterface>({
  _id: mongoose.Types.ObjectId,
  expires: Date,
  session: {
    type: String,
    required: true,
  },
  email: String
});



export const sessionEmployeesModel = mongoose.model<sessionInterface>("SessionEmployees", sessionSchema);
