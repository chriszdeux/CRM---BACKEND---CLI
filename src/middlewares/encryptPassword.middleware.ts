import { NextFunction, Request, Response } from "express";
import { encryptPassword } from "../utils";

export const encryptingPassword = async ( req:Request, res:Response, next: NextFunction ) => {
  const { password } = req.body
  try {
    const newPassword = await encryptPassword(password)
    req.body.password = newPassword
    console.log('Encrypt Done :)')
    console.log(newPassword)
  } catch (error) {
    return res.status(500).json({
      message: 'Conextion failed, encrypt cancelled'
    })
  }

  next()
}