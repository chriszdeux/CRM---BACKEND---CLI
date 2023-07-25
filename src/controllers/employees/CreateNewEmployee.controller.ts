import { Request, Response } from "express";
import { EmployeesModel } from "../../models";
import { formatDate } from "../../utils";

export const createNewEmployee = async (req: Request, res: Response) => {
  try {
    const employee = new EmployeesModel(req.body);
    employee.createdAt = formatDate(new Date())
    await employee.save();
    console.log('New employee created');
    res.status(201).send('success');
  } catch (error) {
    console.error(error);
    res.status(500).send('Problems with create');
  }
  console.log('users post');
};
