import { NextFunction, Request, Response } from "express";
import { EmployeesModel } from "../../models";

export const verifyEmailExist = async ( req: Request, res: Response, next: NextFunction ) => {
  const { email } = req.body
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!emailRegex.test(email)) {
    console.log('Please enter a valid email :)')
    return res.status(400).json({
      message: 'Please enter a valid email :)'
    })
  }

  try {
    const emailExist = await EmployeesModel.findOne({ email: email })
    console.log(emailExist)
    if(emailExist) {
      console.log(`Email ${email} already exist :(`)
      return  res.status(400).json({
        message: 'This account already exist'
      })
    }
    
  } catch (error) {
    console.log('Error')
    return  res.status(500).json({
      message: `Error with this email: ${ email }`
    })
  }

  next()
}