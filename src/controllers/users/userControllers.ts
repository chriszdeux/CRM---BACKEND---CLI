import { Request, Response } from 'express';
import { clearConsole } from '../../utils';
import { usersModel } from '../../models';
import { UserInterfaces } from '../../interfaces/Employees.interface';
import Users from '../../models/employees/Employees.model';

export const getUsers = async (req: Request, res: Response) => {
  clearConsole();
  try {
    const users = await usersModel.find().select('name permissions');
    console.log('users get');
    console.log(users);
    res.send(users);
    console.log('sin errores :D')
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener la lista de usuarios');
  }
};

export const RegisterUser = (req: Request, res: Response) => {

  const newUser: UserInterfaces = req.body
  const user = new Users(newUser); // Create a new instance of the user model

  user.save()
    .then((resp) => {
      console.log('New user created');
      console.log(resp);

      res.status(201).send('success');
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).send('Problems with create');
    });

  console.log('users post');
};

export const updateUser = (req: Request, res: Response) => {
  console.log('users put');
};

export const deleteUser = (req: Request, res: Response) => {
  console.log('users delete');
};
