import { NextFunction, Request, Response } from "express";
import { EmployeesModel, SessionEmployeesModel, SessionUsersModel, UsersModel } from "../../models";


export const CheckLogin = async (req: Request, res: Response, next: NextFunction, session: typeof SessionEmployeesModel | typeof SessionUsersModel) => {
  const email = req.body.email
  try {
    let existingAccount
    if(session === SessionEmployeesModel){
      existingAccount = await EmployeesModel.findOne({ email: email  })
    } else if (session === SessionUsersModel) {
      existingAccount = await UsersModel.findOne({ email: email  })
    }

    if(existingAccount) {
        const existingSession = await session.findOne({ _id: existingAccount?._id });
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

export const VerifyEmployeeSession = async (req: Request, res: Response, next: NextFunction) => {
  await CheckLogin(req, res, next, SessionEmployeesModel)
}
export const VerifyUserSession = async (req: Request, res: Response, next: NextFunction) => {
  await CheckLogin(req, res, next, SessionUsersModel)
}