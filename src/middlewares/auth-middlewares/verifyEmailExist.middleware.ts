import { NextFunction, Request, Response } from "express";
import { employeesModel, usersModel } from "../../models";
import { httpStatusCodes } from "../../utils";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const verifyEmailExist = async ( req: Request, res: Response, next: NextFunction, model: typeof employeesModel | typeof usersModel  ) => {
  const { email } = req.body
  const { badRequest, internalServerError } = httpStatusCodes

  if(!emailRegex.test(email)) {
    return res.status(badRequest.code).json({
      message: 'Please enter a valid email :)'
    })
  }
  try {
    let emailExist;
  
    if (model === employeesModel) {
      emailExist = await employeesModel.findOne({ email: email });
    } else if (model === usersModel) {
      emailExist = await usersModel.findOne({ email: email });
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

export const verifyEmployeeEmail = async ( req: Request, res:Response, next: NextFunction ) => {
  await verifyEmailExist(req, res, next, employeesModel)
}

export const verifyUserEmail = async (req:Request, res:Response, next:NextFunction) => {
  await verifyEmailExist(req,res,next,usersModel);
}