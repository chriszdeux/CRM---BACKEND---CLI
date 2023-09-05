import { Request, Response } from "express";
import { employeesModel, sessionUsersModel } from "../../models";
import { formatDate } from "../../utils";
import { employeeInterfaces } from "../../interfaces";
import mongoose from "mongoose";
const jwt = require("jsonwebtoken");

export const createNewEmployee = async (req: Request, res: Response) => {
  try {
    const employeeData: employeeInterfaces = req.body;
    employeeData.createdAt = formatDate(new Date());
    employeeData.isLogged = true
    
    const secretKey = process.env.SECRET_KEY;
    const tokenExpiration = "7d";
    
    const token = jwt.sign(employeeData, secretKey, { expiresIn: tokenExpiration });
    employeeData.authToken = token
    const { password, ...employeeWithoutPassword } = employeeData;


    const employeeCreated = new employeesModel(employeeData);

    const newSession = new sessionUsersModel({
      _id: employeeCreated._id,
      expires: new Date(Date.now() + parseInt(tokenExpiration) * 1000),
      session: token,
    });

    const responseData = {
      ...employeeWithoutPassword,
      employeeId:  new mongoose.Types.ObjectId(employeeCreated._id)
    } 
    await employeeCreated.save();
    await newSession.save()
    console.log('New employee created 22 :)');
    res.status(201).send({ message: 'success', data: responseData });
  } catch (error) {
    res.status(500).send({message: 'Problems with create', error});
  }
  console.log('users post');
};
