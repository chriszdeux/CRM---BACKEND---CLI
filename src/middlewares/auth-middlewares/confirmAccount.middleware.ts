import { NextFunction, Request, Response } from "express";
import { usersModel } from "../../models";
import { httpStatusCodes } from "../../utils";
export const confirmAccount = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { forbidden, unauthorized} = httpStatusCodes
  try {
    const user = await usersModel.findOne({ _id: id })
    if(user){
      user.confirmedAccount ? next() : res.status(forbidden.code).json({ message: forbidden.message })
    }
  } catch (error) {
    res.status(unauthorized.code).json({ message: unauthorized.message })
  }
  
}