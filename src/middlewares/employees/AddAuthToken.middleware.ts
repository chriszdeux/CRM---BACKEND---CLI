import { NextFunction, Request, Response } from "express";
import SessionModel from "../../models/employees/session.model";
import mongoose from "mongoose";

const jwt = require("jsonwebtoken");

export const addAuthToken = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;
  try {
    
    const secretKey = process.env.SECRET_KEY;
    const tokenExpiration = "1h";
    
    const token = jwt.sign(user, secretKey, { expiresIn: tokenExpiration });
    
    const newSession = new SessionModel({
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
