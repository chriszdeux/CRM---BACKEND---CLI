import { Request, Response } from "express";
import { CustomSessionData } from "../../../typings/express";
import { EmployeesModel, SessionEmployeesModel, SessionUsersModel, UsersModel } from "../../models";

export const logoutUser = async (req: Request, res: Response) => {
  try {
    const userId = req.body.id
    const existingSession = await SessionUsersModel.findById(userId);
    const user = await UsersModel.findOne({ _id: userId })
    
    if( user ) {
      user.isLogged = false
      user.save()
    }
    if (existingSession) {
      await SessionUsersModel.findByIdAndDelete(userId);
      console.log("User session deleted.");
    } else {
      console.log("User session not found.");
    }
    (req.session as any).destroy((err: any) => {
      if (err) {
        console.log("Error destroying session:", err);
      }
      res.status(200).json({ message: "Logout successful" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
