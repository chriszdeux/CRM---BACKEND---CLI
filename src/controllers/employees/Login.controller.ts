import { Request, Response } from "express";
import { EmployeesModel } from "../../models";

export const Login = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const employee = await EmployeesModel.findOne({ email: email });
    if (employee) {
      const authToken = employee.authToken;
      console.log(`Employee: ${employee.name}, Auth Token: ${authToken}`);
      res.status(201).json({ message: "Authorization Success", authToken: employee.authToken });
    } else {
      // console.log(`Employee not found for token: ${token}`);
      res.status(401).json({ message: "Authorization Failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
