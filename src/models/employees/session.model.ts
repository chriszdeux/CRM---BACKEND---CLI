import mongoose, { Document, Schema } from "mongoose";

export interface SessionInterface extends Document {
  _id: mongoose.Types.ObjectId;
  expires: Date;
  session: string;
  email: string;
}

const sessionSchema = new Schema<SessionInterface>({
  _id: mongoose.Types.ObjectId,
  expires: Date,
  session: {
    type: String,
    required: true,
  },
  email: String
});

const SessionModel = mongoose.model<SessionInterface>("Session", sessionSchema);

export default SessionModel;
