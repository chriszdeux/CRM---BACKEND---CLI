import mongoose, { Document } from "mongoose";

export interface sessionInterface extends Document {
  _id: mongoose.Types.ObjectId;
  expires: Date;
  session: string;
  email: string;
}
