import mongoose, { Document } from "mongoose";

export interface SessionInterface extends Document {
  _id: mongoose.Types.ObjectId;
  expires: Date;
  session: string;
  email: string;
}
