import { Request, Response } from "express";
import { EmployeesModel, SessionEmployeesModel } from "../../models";

export const Logout = async (req: Request, res: Response) => {
  try {
    const employeeId = req.body.id
    const existingSession = await SessionEmployeesModel.findById(employeeId);
    const employee = await EmployeesModel.findOne({ _id: employeeId })
    if( employee ) {
      employee.isLogged = false
      employee.save()
    }
    if (existingSession) {
      await SessionEmployeesModel.findByIdAndDelete(employeeId);
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
