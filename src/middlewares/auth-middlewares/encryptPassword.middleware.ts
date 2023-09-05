import { NextFunction, Request, Response } from "express";
import { encryptPassword, httpStatusCodes } from "../../utils";

export const encryptingPassword = async ( req:Request, res:Response, next: NextFunction ) => {
  const { password } = req.body
  const { internalServerError } = httpStatusCodes
  try {
    const newPassword = await encryptPassword(password)
    req.body.password = newPassword
    console.log('Encrypt Done :)')
    console.log(newPassword)
  } catch (error) {
    return res.status(internalServerError.code).json({
      message: 'Connection failed, encrypt cancelled'
    })
  }

  next()
}