import { NextFunction, Request, Response } from "express";
import { employeesModel, sessionUsersModel, usersModel } from "../../models";
import { clearConsole, comparePassword } from "../../utils";
import { CustomSessionData } from "../../../typings/express";
import { sessionEmployeesModel } from "../../models/sessions/SessionEmployee.model";

const jwt = require("jsonwebtoken");

export const validateCredentials = async (req: Request, res: Response, next: NextFunction, model: typeof employeesModel | typeof usersModel, session: typeof sessionEmployeesModel | typeof sessionUsersModel) => {
  const { email, password } = req.body;
  const sessionRequest = req.session as CustomSessionData;
  console.log(sessionRequest)
  try {
    let user
    if(model === employeesModel) {
      user = await employeesModel.findOne({ email: email });
    } else if( model === usersModel ) {
      user = await usersModel.findOne({ email: email });
    }
    if (!user) {
      return res.status(401).json({ message: "Account not found" });
    }

    const authConfirm = await comparePassword(password, user.password);

    if (!authConfirm) {
      console.log("Auth failed: " + authConfirm);
      return res.status(401).json({ message: "Invalid credentials" });
    }
    next()
    
    // const tokenExpiration = 60;
    // const tokenExpiration = 60 * 60 * 24;
    // const secretKey = process.env.SECRET_KEY
    // const token = jwt.sign({ employeeId: user._id }, secretKey, { expiresIn: tokenExpiration });
    // const expirationDate = new Date();
    // expirationDate.setSeconds(expirationDate.getSeconds() + tokenExpiration);

    // sessionRequest.employeeId = user._id.toString();

    // const newSession = new session({
    //   _id: user._id,
    //   expires: expirationDate,
    //   session: JSON.stringify(sessionRequest),
    // });
    
    // user.authToken = token
    // user.isLogged = true
    // await user.save()
    // await newSession.save();
  } catch (error) {
    return res.status(401).json({ message: "Problems with login" });
  }
};

export const validateEmployeeCredentials = async (req: Request, res: Response, next: NextFunction) => {
  await validateCredentials(req, res, next, employeesModel, sessionEmployeesModel)
}

export const validateUserCredentials = async (req: Request, res: Response, next: NextFunction) => {
  await validateCredentials(req, res, next, usersModel, sessionUsersModel)
}
