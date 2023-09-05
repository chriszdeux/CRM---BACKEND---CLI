import mongoose, { Schema } from "mongoose";
import { sessionInterface } from "../../interfaces";

const SessionSchema = new Schema<sessionInterface>({
  _id: mongoose.Types.ObjectId,
  expires: Date,
  session: {
    type: String,
    required: true,
  },
  email: String
});

export const sessionUsersModel = mongoose.model<sessionInterface>("SessionUsers", SessionSchema);
