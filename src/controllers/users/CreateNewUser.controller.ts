import { Request, Response } from "express";
import { UserInterface } from "../../interfaces";
import { formatDate, generateRandomCode, sendCodeEmail } from "../../utils";
import { SessionUsersModel, UsersModel } from "../../models";
import mongoose from "mongoose";
const jwt = require("jsonwebtoken");

export const createNewUser = async ( req:Request, res:Response ) => {
  try {
    let user = req.body
    const userData: UserInterface = req.body;
    userData.createdAt = formatDate(new Date());
    const { password, genre, isLogged, active, experienceLevel, ...userFilters } = userData;

    const secretKey = process.env.SECRET_KEY;
    const tokenExpiration = "7d";
    
    const token = jwt.sign(user, secretKey, { expiresIn: tokenExpiration });
    user.authToken = token

    const code = generateRandomCode()
    const userCreated = new UsersModel(userData);
    userCreated.confirmCode = code
    sendCodeEmail(user.email, code)
    const newSession = new SessionUsersModel({
      _id: userCreated._id,
      expires: new Date(Date.now() + parseInt(tokenExpiration) * 1000),
      session: token,
    });

    await userCreated.save();
    await newSession.save()
    console.log('New user created');
    const newData = {
      ...userFilters,
      userId: userCreated._id
    }
    res.status(201).send({ message: 'success', data: newData });
  } catch (error) {
    res.status(500).send({message: 'Problems with create', error});
  }
  console.log('users post');
}