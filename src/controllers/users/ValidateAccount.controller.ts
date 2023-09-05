import { Request, Response } from "express";
import { usersModel } from "../../models";
import { httpStatusCodes } from "../../utils";

export const validateAccount = async ( req: Request, res: Response ) => {
  const { id } = req.params
  const { code } = req.body
  const { ok, notFound, forbidden } = httpStatusCodes
  try {
    const user = await usersModel.findOne({ _id: id })
    if(!user){
      res.status(notFound.code).json({ message: notFound.message })
      return
    }
    if(user.confirmCode === code) {
      user.confirmedAccount = true
      user.credits = 10000
      user.save()
      res.status(ok.code).json({ message: ok.message })
    } else {
      res.status(forbidden.code).json({ message: forbidden.message })
    }
  } catch (error) {
    console.error(error)
  }
}