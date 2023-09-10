import { Request, Response } from "express";
import { TransactionsModel, UsersModel } from "../../models";

export const NewTransaction = async ( req: Request, res: Response ) => {
  const body = req.body
  try {
    const newTransaction = new TransactionsModel(body)
    const user = await UsersModel.findOne({ _id: body.sender })
    const transactionId = newTransaction.toObject()._id.toString()
    if(!user){
      return res.status(404).json({
        message: 'User not found'
      })
    }
    newTransaction.transactionId = transactionId
    user.transactions = [...user.transactions, transactionId]
    await newTransaction.save()
    await user.save()
    const { _id, __v, ...response } = newTransaction.toObject()
    res.status(201).json({ message: 'Transactions is pending', data: response })
  } catch (error) {
    return error
  }
}