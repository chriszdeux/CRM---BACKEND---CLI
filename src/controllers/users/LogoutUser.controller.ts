import { Request, Response } from "express";
import { CustomSessionData } from "../../../typings/express";
import { employeesModel, sessionEmployeesModel, sessionUsersModel, usersModel } from "../../models";

export const logoutUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const existingSession = await sessionUsersModel.findById(userId);
    const user = await usersModel.findOne({ _id: userId })
    
    if( user ) {
      user.isLogged = false
      user.save()
    }
    if (existingSession) {
      await sessionUsersModel.findByIdAndDelete(userId);
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
