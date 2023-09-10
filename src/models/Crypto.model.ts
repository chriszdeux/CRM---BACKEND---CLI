import mongoose, { Schema } from "mongoose";
import { CryptoInterface } from "../interfaces";

const CryptoSchema = new Schema<CryptoInterface>({
  idCrypto: { type: String, required: true },
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  currentPrice: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  totalVolume24h: { type: Number, required: true },
  circulatingSupply: { type: Number, required: true },
  maxSupply: { type: Number },
  allTimeHigh: { type: Number },
  athDate: { type: String },
  marketRank: { type: Number, required: true },
  website: { type: String, required: true },
  description: { type: String, required: true },
  logoImage: { type: String, required: true },
  whitepaper: { type: String },
  createdAt: { type: String },
  tags: [String],
});

export const CryptoModel = mongoose.model<CryptoInterface>('Cryptos', CryptoSchema);
