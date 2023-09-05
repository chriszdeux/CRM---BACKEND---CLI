import { NextFunction, Request, Response } from "express";
import { employeesModel, sessionEmployeesModel, sessionUsersModel, usersModel } from "../../models";


export const checkLogin = async (req: Request, res: Response, next: NextFunction, session: typeof sessionEmployeesModel | typeof sessionUsersModel) => {
  const email = req.body.email
  try {
    let existingAccount
    if(session === sessionEmployeesModel){
      existingAccount = await employeesModel.findOne({ email: email  })
    } else if (session === sessionUsersModel) {
      existingAccount = await usersModel.findOne({ email: email  })
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

export const verifyEmployeeSession = async (req: Request, res: Response, next: NextFunction) => {
  await checkLogin(req, res, next, sessionEmployeesModel)
}
export const verifyUserSession = async (req: Request, res: Response, next: NextFunction) => {
  await checkLogin(req, res, next, sessionUsersModel)
}