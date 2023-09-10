import { Request, Response } from "express";
import { UserInterface } from "../../interfaces";
import { formatDate, generateRandomCode, sendCodeEmail } from "../../utils";
import { SessionUsersModel, UsersModel } from "../../models";
import mongoose from "mongoose";
const jwt = require("jsonwebtoken");

export const CreateNewUser = async ( req:Request, res:Response ) => {
  try {
    let user = req.body
    const userData: UserInterface = req.body;
    userData.createdAt = formatDate(new Date());
    userData.credits = 10000
    userData.confirmedAccount = false

    const code = generateRandomCode()
    userData.confirmCode = code
    const secretKey = process.env.SECRET_KEY;
    const tokenExpiration = "7d";
    
    const token = jwt.sign(user, secretKey, { expiresIn: tokenExpiration });
    user.authToken = token

    const userCreated = new UsersModel(userData);
    userCreated.userId = userCreated._id.toString()
    userData.userId = userCreated._id.toString()
    sendCodeEmail(user.email, code)
    await userCreated.save();
      const { _id, __v, password:pass, ...response } = user

    res.status(201).send({ message: 'success', data: response });
  } catch (error) {
    res.status(500).send({message: 'Problems with create', error});
  }
  console.log('users post');
}