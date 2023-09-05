import { Request, Response } from "express";
import { CustomSessionData } from "../../../typings/express";
import { employeesModel, sessionUsersModel } from "../../models";

export const logout = async (req: Request, res: Response) => {
  try {
    const employeeId = req.body.id
    const existingSession = await sessionUsersModel.findById(employeeId);
    const employee = await employeesModel.findOne({ _id: employeeId })
    if( employee ) {
      employee.isLogged = false
      employee.save()
    }
    if (existingSession) {
      await sessionUsersModel.findByIdAndDelete(employeeId);
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
