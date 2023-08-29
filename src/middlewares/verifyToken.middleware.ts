import { NextFunction, Request, Response } from "express";
import { EmployeesModel } from "../models";
const jwt = require("jsonwebtoken");

export const verifyToken = async  (req:Request, res:Response, next:NextFunction) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ message: 'No Token' });
    }
    const employee = await EmployeesModel.find({authToken: token });
    if(employee.length === 0 || employee[0].authToken !== token){
      return res.status(401).json({ message: 'Invalid Token' })
    }
    if(!employee[0].isLogged) {
      return res.status(401).json({ message: 'Contact Support' })
    }
    console.log(employee)
    // if( employee.authToken !== token ) {
    //   return res.status(401).json({ message: 'Invalid Token' });
    // }
    const secretKey = process.env.SECRET_KEY
    jwt.verify(token, secretKey, async (err:any, decoded:any) => {
    if (err) {
      console.log(err)
      return res.status(401).json({ message: 'Invalid Token' });
    }
    next();
    });
  } catch (error) {
    
  }
}
