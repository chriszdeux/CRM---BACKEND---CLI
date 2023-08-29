import { NextFunction, Request, Response } from "express";
import { EmployeesModel, UsersModel } from "../models";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const verifyEmailExist = async ( req: Request, res: Response, next: NextFunction, model: typeof EmployeesModel | typeof UsersModel  ) => {
  const { email } = req.body
  if(!emailRegex.test(email)) {
    console.log('Please enter a valid email :)')
    return res.status(400).json({
      message: 'Please enter a valid email :)'
    })
  }
  try {
    let emailExist;
  
    if (model === EmployeesModel) {
      emailExist = await EmployeesModel.findOne({ email: email });
    } else if (model === UsersModel) {
      emailExist = await UsersModel.findOne({ email: email });
    }
  
    if(emailExist) {
      console.log(`Email ${email} already exist :(`)
      return  res.status(400).json({
        message: 'This account already exist'
      })
    }
    next()
    
  } catch (error) {
    console.log('Error')
    return  res.status(500).json({
      message: `Error with this email: ${ email }`
    })
  }

}

export const verifyEmployeeEmail = async ( req: Request, res:Response, next: NextFunction ) => {
  await verifyEmailExist(req, res, next, EmployeesModel)
}

export const verifyUserEmail = async (req:Request, res:Response, next:NextFunction) => {
  await verifyEmailExist(req,res,next,UsersModel);
}