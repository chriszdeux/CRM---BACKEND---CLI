import { TransactionInterface } from "./interfaces";

declare module 'express' {
  interface Request {
    transaction?: TransactionInterface;
  }
}
