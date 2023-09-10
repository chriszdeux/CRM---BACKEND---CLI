import { NextFunction, Request, Response } from "express";
import { validateObject } from "../../utils";
import { CryptoModel, UsersModel } from "../../models";
import { CryptoInterface, UserInterface } from "../../interfaces";
import { httpStatusCodes } from "../../types";

export const ValidateRequest =  async(req: Request, res: Response, next: NextFunction) => {
  const body = req.body
  const { internalServerError } = httpStatusCodes
  try {
    const isBody = validateObject(body)
    if(!isBody){
      res.status(400).json({
        message: 'All fields required'
      })
    }
    const user = await UsersModel.findById(body.userId).select('credits')
    const crypto = await CryptoModel.findById(body.assetId).select('circulatingSupply')
    if(user && crypto) {
      if(user?.credits < body.total) {
        return res.status(401).json({
          message: 'You have insufficient credits to perform this action'
        }) 
      } 
      if(crypto?.circulatingSupply < body.amount) {
        return res.status(401).json({
          message: 'Insufficient crypto reserves for this transaction.'
        }) 
      } 
      next()
    }
  } catch (error:any) {
    res.status(internalServerError.code).json({
      message: 'Error on validate your request'
    })
    console.log(error.message)
  }
}