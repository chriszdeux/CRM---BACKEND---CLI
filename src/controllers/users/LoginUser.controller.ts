import { Request, Response } from "express";
import { SessionUsersModel, UsersModel } from "../../models";
const jwt = require("jsonwebtoken");

export const LoginUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user  = await UsersModel.findOne({ email: email }, { password: 0 });
    
    if (user) {

      const secretKey = process.env.SECRET_KEY;
      const tokenExpiration = "7d";
      
      const token = jwt.sign(req.body, secretKey, { expiresIn: tokenExpiration });
      user.authToken = token

      const { _id, __v, ...response } = user.toObject()
      // const newSession = new SessionUsersModel({
      //   _id: user._id,
      //   expires: new Date(Date.now() + parseInt(tokenExpiration) * 1000),
      //   session: token,
      // });

      user.isLogged = true
      await user.save()
      // await newSession.save()
      console.log(`User: ${user.name} logged`);
      res.status(200).json({ message: "Authorization Success", data: response});
    } else {
      console.log(`User not found for token: ${email}`);
      res.status(401).json({ message: "Authorization Failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
