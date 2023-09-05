import { NextFunction, Request, Response } from "express";
import { EmployeesModel, UsersModel } from "../../models";
import { httpStatusCodes } from "../../utils";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const VerifyEmailExist = async ( req: Request, res: Response, next: NextFunction, model: typeof EmployeesModel | typeof UsersModel  ) => {
  const { email } = req.body
  const { badRequest, internalServerError } = httpStatusCodes

  if(!emailRegex.test(email)) {
    return res.status(badRequest.code).json({
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
      return  res.status(badRequest.code).json({
        message: 'This account already exist'
      })
    }
    next()
    
  } catch (error) {
    console.log('Error')
    return  res.status(internalServerError.code).json({
      message: `Error with this email: ${ email }`
    })
  }

}

export const VerifyEmployeeEmail = async ( req: Request, res:Response, next: NextFunction ) => {
  await VerifyEmailExist(req, res, next, EmployeesModel)
}

export const VerifyUserEmail = async (req:Request, res:Response, next:NextFunction) => {
  await VerifyEmailExist(req,res,next,UsersModel);
}