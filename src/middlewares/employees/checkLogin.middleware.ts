import { NextFunction, Request, Response } from "express";
import { CustomSessionData } from "../../../typings/express";
import SessionModel from "../../models/employees/session.model";
import { EmployeesModel } from "../../models";
import { EmployeeInterfaces } from "../../interfaces";

export const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email
  try {
    const existingAccount = await EmployeesModel.findOne({ email: email  })
    if(existingAccount) {
        const existingSession = await SessionModel.findOne({ _id: existingAccount?._id });
          if (existingSession) {
          console.log("User already has an active session.");
          console.log(existingSession);
          return res.status(200).json({ message: "User already logged in", data: existingSession });
        }
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
