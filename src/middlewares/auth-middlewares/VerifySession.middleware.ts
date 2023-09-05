import { NextFunction, Request, Response } from "express";
import { sessionEmployeesModel, sessionUsersModel } from "../../models";

 const verifySession = async ( req: Request, res: Response, next: NextFunction, session: typeof sessionEmployeesModel | typeof sessionUsersModel ) => {
  const id = req.params.id
  try {
    const sessionExist = await session.findById({ _id: id })
    console.log(sessionExist)
    if(sessionExist){
      console.log("active session")
      next()
    } else {
      res.status(404).send({ message: 'Session not found' })
    }
  } catch (error) {
    res.status(401).send({ message: 'Error with logout', data: error })
  }
}

export const isEmployeeSessionActive = async (req: Request, res: Response, next: NextFunction) => {
  await verifySession(req, res, next, sessionEmployeesModel)
}
export const isUserSessionActive = async (req: Request, res: Response, next: NextFunction) => {
  await verifySession(req, res, next, sessionUsersModel)
}