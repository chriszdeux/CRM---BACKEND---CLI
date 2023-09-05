import mongoose, { Schema } from "mongoose";
import { CryptoInterface } from "../interfaces";

const CryptoSchema = new Schema<CryptoInterface>({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  currentPrice: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  totalVolume24h: { type: Number, required: true },
  circulatingSupply: { type: Number, required: true },
  maxSupply: { type: Number },
  allTimeHigh: { type: Number, required: true },
  athDate: { type: String, required: true },
  marketRank: { type: Number, required: true },
  website: { type: String, required: true },
  description: { type: String, required: true },
  logoImage: { type: String, required: true },
  whitepaper: { type: String },
  tags: [String],
});

const CryptoModel = mongoose.model<CryptoInterface>('CryptoInfo', CryptoSchema);

export default CryptoModel;