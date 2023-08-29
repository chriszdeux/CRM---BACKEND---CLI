import { Request, Response } from "express";
import { CoinModel } from "../../models";
import { formatDate } from "../../utils";
import { CoinInterface } from "../../interfaces";

export const createNewCoin = async (req: Request, res: Response) => {
  const coinData: CoinInterface = req.body;
  try {
    const newCoin = new CoinModel(coinData);
    newCoin.createdAt = formatDate(new Date());
    await newCoin.save();
    res.status(200).send({ message: 'Created Success', data: newCoin });
  } catch (error) {
    res.status(500).send({ message: 'Error on server' });
  }
}
