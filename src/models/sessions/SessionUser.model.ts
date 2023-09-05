import mongoose, { Schema } from "mongoose";
import { SessionInterface } from "../../interfaces";

const SessionSchema = new Schema<SessionInterface>({
  _id: mongoose.Types.ObjectId,
  expires: Date,
  session: {
    type: String,
    required: true,
  },
  email: String
});

export const SessionUsersModel = mongoose.model<SessionInterface>("SessionUsers", SessionSchema);
