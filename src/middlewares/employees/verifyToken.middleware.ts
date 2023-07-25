import { NextFunction, Request, Response } from "express";
import { EmployeesModel } from "../../models";
const jwt = require("jsonwebtoken");

export const verifyToken =  (req:Request, res:Response, next:NextFunction) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
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
    
  }
}
