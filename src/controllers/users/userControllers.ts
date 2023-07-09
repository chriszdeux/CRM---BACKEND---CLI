import { Request, Response } from 'express';
import { clearConsole } from '../../utils';
import { userModel } from '../../models';

export const getUsers = async (req: Request, res: Response) => {
  clearConsole();
  try {
    const users = await userModel.find();
    console.log('users get');
    console.log(users);
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener la lista de usuarios');
  }
};

export const addUser = (req: Request, res: Response) => {
  clearConsole();
  console.log('users post');
};

export const updateUser = (req: Request, res: Response) => {
  console.log('users put');
};

export const deleteUser = (req: Request, res: Response) => {
  console.log('users delete');
};
