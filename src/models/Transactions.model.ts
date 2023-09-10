import mongoose, { Schema } from "mongoose";
import { TransactionInterface } from "../interfaces";

const TransactionSchema = new Schema<TransactionInterface>({
  transactionId: String,
  startDate: Date,
  endDate: Date,
  sender: String,
  recipient: String,
  amount: Number,
  total: Number,
  
  currency: String,
  description: String,
  status: String,
  referenceNumber: String,
  transactionType: String,
  transactionDuration: String,
  asset: String,
  assetId: String,
});

export const TransactionsModel = mongoose.model<TransactionInterface>('Transactions', TransactionSchema);
