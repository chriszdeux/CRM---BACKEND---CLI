import { Request, Response } from "express";
import { CryptoModel, TransactionsModel, UsersModel } from "../../models";
import { httpStatusCodes, statusTransactionsTypes } from "../../types";
import { calculateTimeDifference } from "../../utils";

export const BuyCrypto = async ( req: Request, res: Response ) => {
  const body = req.body
  const { internalServerError } = httpStatusCodes
  console.log(body)
  try {
    const user = await UsersModel.findById(body.userId).select('credits portfolio transactions')
    const crypto = await CryptoModel.findById(body.assetId).select('circulatingSupply name logoImage currentPrice')
    const transaction = await TransactionsModel.findById(body.transactionId)
    
    if(user !== null && crypto !== null && transaction !== null){
      let portafolioUpdated = [...user.portfolio.crypto]
      if (user.portfolio.crypto.find((asset:any) => asset.id === body.assetId)) {
        portafolioUpdated = portafolioUpdated.map((asset:any) => {
          if (asset.id === body.assetId) {
            return { ...asset, amount: asset.amount + body.amount, name: asset.name, logoImg: crypto.logoImage };
          }
          return asset;
        });
      } else {
        portafolioUpdated = [...portafolioUpdated, { id: body.assetId, amount: body.amount, name: crypto.name, logoImg: crypto.logoImage }];
      }

      user.portfolio.crypto = portafolioUpdated
      crypto.circulatingSupply += body.amount
      const random = Math.floor(Math.random() * 10) + 1
      setTimeout(() => {
        const endDate = new Date()
        user.save()
        crypto.save()
        transaction.endDate = endDate
        transaction.transactionDuration = calculateTimeDifference(transaction.startDate, endDate)
        transaction.status = statusTransactionsTypes.completed
        transaction.save()

        const response = user.portfolio.crypto.map(asset => {
          return {
            id: asset._id,
            amount: asset.amount, 
            name: asset.name,
            logoImg: crypto.logoImage
          }
        })
        const { _id, __v, ...transactionResponse } = transaction.toObject()
        console.log('TRANSACTION DONE')
        return res.status(200).json({
          message: 'Transaction Completed',
          portfolio: response,
          transaction: transactionResponse,
          credits: user.credits
        })
      }, random * 1000);
      console.log('TRANSACTIO PENDING')
    }
  } catch (error) {
    res.status(internalServerError.code).json({
      message: 'Error, cannot complete transaction'
    })
  }
}