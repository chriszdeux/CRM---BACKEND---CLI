import { Request, Response } from "express";
import { clearConsole } from "../../utils";
import {EmployeesModel} from "../../models/index"

export const getEmployees = async (req: Request, res: Response) => {  
  clearConsole();
  try {
    const employees = await EmployeesModel.find();
    console.log('Done :)')
    res.send(employees);
  } catch (error) {
    console.error(error);
    console.log(error)
    res.status(500).send(error);
  }
};