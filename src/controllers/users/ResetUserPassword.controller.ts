import { Request, Response } from "express";
import { UsersModel } from "../../models";
import { encryptPassword } from "../../utils";

export const ResetUserPassword = async ( req: Request, res: Response ) => {
  const { email, password, newPassword } = req.body

  try {
    const newPass = await encryptPassword(newPassword)
    const user = await UsersModel.findOne({ email: email })
    if(user){
      user.password = newPass
      await user.save()
      res.status(200).json({ message: 'Password changed' })
    } else {
      console.log('cannot change password')
    }
    
  } catch (error) {
    res.status(401).json({ message: `Cannot change your password, please contact support. Error: ${ error }` })
  }
  console.log(req.body)
}