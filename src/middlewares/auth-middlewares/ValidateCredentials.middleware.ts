import { NextFunction, Request, Response } from "express";
import { EmployeesModel, SessionUsersModel, UsersModel } from "../../models";
import { clearConsole, comparePassword } from "../../utils";
import { CustomSessionData } from "../../../typings/express";
import { SessionEmployeesModel } from "../../models/sessions/SessionEmployee.model";

const jwt = require("jsonwebtoken");

export const ValidateCredentials = async (req: Request, res: Response, next: NextFunction, model: typeof EmployeesModel | typeof UsersModel, session: typeof SessionEmployeesModel | typeof SessionUsersModel) => {
  const { email, password } = req.body;
  const sessionRequest = req.session as CustomSessionData;
  console.log(sessionRequest)
  try {
    let user
    if(model === EmployeesModel) {
      user = await EmployeesModel.findOne({ email: email });
    } else if( model === UsersModel ) {
      user = await UsersModel.findOne({ email: email });
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
  } catch (error) {
    return res.status(401).json({ message: "Problems with login" });
  }
};

export const ValidateEmployeeCredentials = async (req: Request, res: Response, next: NextFunction) => {
  await ValidateCredentials(req, res, next, EmployeesModel, SessionEmployeesModel)
}

export const ValidateUserCredentials = async (req: Request, res: Response, next: NextFunction) => {
  await ValidateCredentials(req, res, next, UsersModel, SessionUsersModel)
}
