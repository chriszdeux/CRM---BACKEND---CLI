import { Request, Response, NextFunction } from 'express';
import { TransactionInterface } from '../../interfaces';
import { httpStatusCodes, statusTransactionsTypes } from '../../types';
import { formatDate, validateObject } from '../../utils';
export const parseTransactionBody = (req: Request, res: Response, next: NextFunction) => {
  const { unauthorized, internalServerError } = httpStatusCodes
  try {
    const { 
      sender,
      recipient,
      amount, 
      currency, 
      description, 
      referenceNumber, 
      transactionType, 
      asset, 
      assetId,
    } = req.body;
    const newBody = {
      date: formatDate(new Date()),
      sender,
      recipient,
      amount, 
      currency, 
      description,
      referenceNumber, 
      transactionType, 
      asset, 
      assetId,
      status: statusTransactionsTypes.pending 
    }
    const bodyValidate = validateObject(newBody)   
    if(!req.body || !bodyValidate){
      res.status(unauthorized.code).send({ message: 'Need all fields' })
      return
    }
    req.body = newBody
    next();
  } catch (error) {
  }
};
