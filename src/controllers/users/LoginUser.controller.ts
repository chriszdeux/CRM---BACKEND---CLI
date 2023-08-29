import { Request, Response } from "express";
import { UsersModel } from "../../models";

export const LoginUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user  = await UsersModel.findOne({ email: email }, { password: 0 });
    if (user) {
      console.log(`User: ${user.name} logged`);
      res.status(201).json({ message: "Authorization Success", data: user});
    } else {
      console.log(`User not found for token: ${email}`);
      res.status(401).json({ message: "Authorization Failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
