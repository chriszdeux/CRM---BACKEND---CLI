import { Request, Response } from "express";
import { EmployeesModel, SessionEmployeesModel } from "../../models";
const jwt = require("jsonwebtoken");

export const Login = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const employee  = await EmployeesModel.findOne({ email: email }, { password: 0 });
    const secretKey = process.env.SECRET_KEY;
    const tokenExpiration = "7d";

    if (employee) {
      console.log(employee)
      const token = jwt.sign(req.body, secretKey, { expiresIn: tokenExpiration });

      const responseData = {
        name: employee.name,
        email: employee.email,
        role: employee.role,
        active: employee.active,
        permissions: employee.permissions,
        createdAt: employee.createdAt,
        birthday: employee.birthday,
        profileImage: employee.profileImage,
        authToken: token,
        isLogged: true,
        employeeId: employee._id
      };
      employee.isLogged = true
      employee.authToken = token
      employee.save()


      // const newSession = new SessionEmployeesModel({
      //   _id: employee._id,
      //   expires: new Date(Date.now() + parseInt(tokenExpiration) * 1000),
      //   session: token,
      // });


      // await newSession.save()
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
