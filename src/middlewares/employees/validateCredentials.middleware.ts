import { NextFunction, Request, Response } from "express";
import { EmployeesModel } from "../../models";
import { clearConsole, comparePassword } from "../../utils";
import { CustomSessionData } from "../../../typings/express";
import SessionModel from "../../models/employees/session.model";

const jwt = require("jsonwebtoken");

export const validateCredentials = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const session = req.session as CustomSessionData;
  console.log(session)
  try {
    let employee = await EmployeesModel.findOne({ email: email });
    if (!employee) {
      return res.status(401).json({ message: "Account not found" });
    }

    const authConfirm = await comparePassword(password, employee.password);

    if (!authConfirm) {
      console.log("Auth failed: " + authConfirm);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // const tokenExpiration = 60;
    const tokenExpiration = 60 * 60 * 24;
    const secretKey = process.env.SECRET_KEY
    const token = jwt.sign({ employeeId: employee._id }, secretKey, { expiresIn: tokenExpiration });
    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + tokenExpiration);

    session.employeeId = employee._id.toString();

    const newSession = new SessionModel({
      _id: employee._id,
      expires: expirationDate,
      session: JSON.stringify(session),
    });

    employee.authToken = token
    employee.isLogged = true
    await employee.save()
    await newSession.save();
    next()
  } catch (error) {
    return res.status(401).json({ message: "Problems with login" });
  }
};
