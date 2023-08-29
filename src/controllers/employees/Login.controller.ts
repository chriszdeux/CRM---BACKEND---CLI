import { Request, Response } from "express";
import { EmployeesModel } from "../../models";

export const Login = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const employee  = await EmployeesModel.findOne({ email: email }, { password: 0 });
    if (employee) {
      console.log(employee)
      const responseData = {
        name: employee.name,
        email: employee.email,
        role: employee.role,
        active: employee.active,
        permissions: employee.permissions,
        createdAt: employee.createdAt,
        birthday: employee.birthday,
        profileImage: employee.profileImage,
        authToken: employee.authToken,
        isLogged: true,
        employeeId: employee._id
      };
      employee.isLogged = true
      employee.save()
      console.log(`Employee: ${employee.name} logged`);
      res.status(200).json({ message: "Authorization Success", data: responseData});
    } else {
      console.log(`Employee not found for token: ${email}`);
      res.status(401).json({ message: "Authorization Failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
