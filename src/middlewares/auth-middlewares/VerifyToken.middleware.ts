import { NextFunction, Request, Response } from "express";
import { EmployeesModel, UsersModel } from "../../models";
const jwt = require("jsonwebtoken");

export const VerifyToken = async  (req:Request, res:Response, next:NextFunction, model: typeof EmployeesModel | typeof UsersModel ) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ message: 'No Token' });
    }
    if( model === EmployeesModel ) {
      const employee = await EmployeesModel.find({authToken: token });
      if(employee.length === 0 || employee[0].authToken !== token){
        return res.status(401).json({ message: 'Invalid Token' })
      }
      if(!employee[0].isLogged) {
        return res.status(401).json({ message: 'Contact Support' })
      }
    } 
    else if ( model === UsersModel ) {
      const user = await UsersModel.find({authToken: token });
      if(user.length === 0 || user[0].authToken !== token){
        return res.status(401).json({ message: 'Invalid Token' })
      }
      if(!user[0].isLogged) {
        return res.status(401).json({ message: 'Contact Support' })
      }
    }
    const secretKey = process.env.SECRET_KEY
    jwt.verify(token, secretKey, async (err:any, decoded:any) => {
    if (err) {
      console.log(err)
      return res.status(401).json({ message: 'Invalid Token' });
    }
    next();
    });
  } catch (error) {
    return error
  }
}


export const ValidateEmployeeToken = async (req: Request, res:Response, next: NextFunction) => {
  await VerifyToken(req, res, next, EmployeesModel)
}

export const ValidateUsersToken = async (req: Request, res:Response, next: NextFunction) => {
  await VerifyToken(req, res, next, UsersModel)
}