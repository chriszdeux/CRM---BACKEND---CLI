export interface TransactionInterface {
  transactionId?: string;
  startDate: Date;
  endDate?: Date;
  sender?: string;
  recipient?: string;
  amount: number;
  total?: number;
  currency: string;
  description?: string;
  status: string;
  referenceNumber?: string;
  transactionType: 'buy' | 'sell' | 'send' | 'convert' | 'donation';
  transactionDuration: string;
  asset: string;
  assetId?: string;
  __v?: string
}