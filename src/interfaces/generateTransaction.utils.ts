import { formatDate } from "../utils";
import { TransactionInterface } from "./Transactions.Interface";

export const generateTransaction = ( data:TransactionInterface ) => {
  const { sender, recipient, amount, currency, description, status } = data
  const generate = {
    date: formatDate(new Date())
    sender:
  }
}