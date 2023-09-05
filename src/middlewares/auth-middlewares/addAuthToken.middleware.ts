import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { sessionEmployeesModel, sessionUsersModel } from "../../models";

const jwt = require("jsonwebtoken");
export const addAuthToken = async (req: Request, res: Response, next: NextFunction, model: typeof sessionEmployeesModel | typeof sessionUsersModel ) => {
  const user = req.body;
  try {
    
    const secretKey = process.env.SECRET_KEY;
    const tokenExpiration = "7d";
    
    const token = jwt.sign(user, secretKey, { expiresIn: tokenExpiration });
    
    const newSession = new model({
      _id: new mongoose.Types.ObjectId(),
      expires: new Date(Date.now() + parseInt(tokenExpiration) * 1000),
      session: token,
    });
    user.authToken = token
    
    await newSession.save();
    next();
  } catch (error) {
    return res.status(500).json({ message: "Failed to create session token" });
  }
};


export const addEmployeeAuthToken = async (req: Request, res: Response, next: NextFunction) => {
  await addAuthToken(req, res, next, sessionEmployeesModel)
}

export const addUserAuthToken = async (req: Request, res: Response, next: NextFunction) => {
  await addAuthToken(req, res, next, sessionUsersModel)
}