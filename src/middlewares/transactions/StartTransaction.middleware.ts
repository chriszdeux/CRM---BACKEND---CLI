import { NextFunction, Request, Response } from "express";
import { CryptoModel, TransactionsModel, UsersModel } from "../../models";
import { descriptionTransactions, httpStatusCodes, statusTransactionsTypes, transactionTypes } from "../../types";
import { generateReferenceCode } from "../../utils";

export const StartTransaction = async ( req: Request, res: Response, next: NextFunction ) => {
  const { userId, assetId, amount, total,  } = req.body
  const { internalServerError } = httpStatusCodes
  try {
    const user = await UsersModel.findById(userId)
    const asset = await CryptoModel.findById(assetId).select('name currentPrice')
    if(user && asset) {
      const totalCost = asset.currentPrice * req.body.amount
      user.credits-= totalCost
      const transactionData = {
        startDate: new Date(),
        sender: userId,
        amount,
        total: totalCost,
        currency: 'MRC',
        status: statusTransactionsTypes.pending,
        referenceNumber: generateReferenceCode(),
        transactionType: transactionTypes.BUY,
        asset: asset.name,
        description: descriptionTransactions.buy
      }
      const newTransaction = new TransactionsModel(transactionData)
      newTransaction.transactionId = newTransaction._id.toString()
      newTransaction.save()
      req.body.transactionId = newTransaction._id.toString()
      next()
    } else {
      res.status(401).json({
        message: 'Failed transaction'
      })
    }
  } catch (error:any) {
    res.status(internalServerError.code).json({
      message: 'Failed to start transaction'
    })
    console.log(error.message)
  }
}