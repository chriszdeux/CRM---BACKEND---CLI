import { NextFunction, Request, Response } from "express";
import { employeesModel, usersModel } from "../../models";
const jwt = require("jsonwebtoken");

export const verifyToken = async  (req:Request, res:Response, next:NextFunction, model: typeof employeesModel | typeof usersModel ) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ message: 'No Token' });
    }
    if( model === employeesModel ) {
      const employee = await employeesModel.find({authToken: token });
      if(employee.length === 0 || employee[0].authToken !== token){
        return res.status(401).json({ message: 'Invalid Token' })
      }
      if(!employee[0].isLogged) {
        return res.status(401).json({ message: 'Contact Support' })
      }
    } 
    else if ( model === usersModel ) {
      const user = await usersModel.find({authToken: token });
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


export const validateEmployeeToken = async (req: Request, res:Response, next: NextFunction) => {
  await verifyToken(req, res, next, employeesModel)
}

export const validateUsersToken = async (req: Request, res:Response, next: NextFunction) => {
  await verifyToken(req, res, next, usersModel)
}