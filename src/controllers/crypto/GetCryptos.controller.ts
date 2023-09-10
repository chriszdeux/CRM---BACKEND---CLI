import { Request, Response } from "express";
import { CryptoModel } from "../../models";
import { httpStatusCodes } from "../../types";

export const GetCryptos = async ( req: Request, res: Response ) => {
  const { ok, internalServerError } = httpStatusCodes
  try {
  const Cryptos = await CryptoModel.find()
  const total = Cryptos.reduce((acc, curr) => {
    return acc + curr.marketCap
  }, 0)

  const cleanData = Cryptos.map(crypto => {
    const { _id, __v, ...rest } = crypto.toObject()
    return rest
  });

  const response = {
    message: 'Crypto list',
    count: Cryptos.length,
    totalAmountInCryptos: total,
    data:cleanData
  }

  res.status(ok.code).json( response )
} catch (error) {
  res.status(internalServerError.code).json({
    message: internalServerError.message , error})
  }
}
