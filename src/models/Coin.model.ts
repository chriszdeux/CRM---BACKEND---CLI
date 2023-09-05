import mongoose, { Schema } from "mongoose";
import { coinInterface } from "../interfaces";

const coinSchema = new Schema<coinInterface>({
  uuid: { type: String, required: true },
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, required: true },
  iconUrl: { type: String, required: true },
  supply: {
    confirmed: { type: Boolean, required: true },
    supplyAt: { type: Number, required: true },
    maxSupply: { type: String, required: true },
    totalSupply: { type: String, required: true },
    circulatingSupply: { type: String, required: true }
  },
  volume24h: { type: String, required: true },
  marketCap: { type: String, required: true },
  fullyDilutedMarketCap: { type: String, required: true },
  price: { type: String, required: true },
  priceAt: { type: Number, required: true },
  change: { type: String, required: true },
  rank: { type: Number, required: true },
  sparkline: { type: [String], required: true },
  allTimeHigh: {
    price: { type: String, required: true },
    timestamp: { type: Number, required: true }
  },
  lowVolume: { type: Boolean, required: true },
  listedAt: { type: Number, required: true },
  hasContent: { type: Boolean, required: true },
  notices: { type: mongoose.Schema.Types.Mixed },
  tags: { type: [String], required: true },
  createdAt: { type: String, required: true }
});

export const coinModel = mongoose.model<coinInterface>('coins', coinSchema);