import { Request, Response } from "express";
import { CoinModel } from "../../models";
import { formatDate } from "../../utils";
import { CoinInterface, CryptoInterface } from "../../interfaces";
import {CryptoModel} from "../../models";

export const CreateNewCoin = async (req: Request, res: Response) => {
  const coinData: CryptoInterface = req.body;
  
  try {
    const newCoin = new CryptoModel(coinData);
    newCoin.createdAt = formatDate(new Date());
    newCoin.idCrypto = newCoin.toObject()._id.toString()
    await newCoin.save();
    const { _id, __v, ...response } = newCoin.toObject()
    res.status(200).send({ message: 'Created Success', data: response });
  } catch (error) {
    res.status(500).send({ message: 'Error on server', error });
  }
}
