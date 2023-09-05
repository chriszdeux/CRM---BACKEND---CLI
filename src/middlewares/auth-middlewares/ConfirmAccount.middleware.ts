import { NextFunction, Request, Response } from "express";
import { UsersModel } from "../../models";
import { httpStatusCodes } from "../../utils";
export const ConfirmAccount = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { forbidden, unauthorized} = httpStatusCodes
  try {
    const user = await UsersModel.findOne({ _id: id })
    if(user){
      user.confirmedAccount ? next() : res.status(forbidden.code).json({ message: forbidden.message })
    }
  } catch (error) {
    res.status(unauthorized.code).json({ message: unauthorized.message })
  }
  
}