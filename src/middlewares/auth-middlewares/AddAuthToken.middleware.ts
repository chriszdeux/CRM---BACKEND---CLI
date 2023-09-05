import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { SessionEmployeesModel, SessionUsersModel } from "../../models";

const jwt = require("jsonwebtoken");

export const AddAuthToken = async (req: Request, res: Response, next: NextFunction, model: typeof SessionEmployeesModel | typeof SessionUsersModel ) => {
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


export const AddEmployeeAuthToken = async (req: Request, res: Response, next: NextFunction) => {
  await AddAuthToken(req, res, next, SessionEmployeesModel)
}

export const AddUserAuthToken = async (req: Request, res: Response, next: NextFunction) => {
  await AddAuthToken(req, res, next, SessionUsersModel)
}