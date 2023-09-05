
export interface CoinSupplyData {
  confirmed: boolean;
  supplyAt: number;
  maxSupply: string;
  totalSupply: string;
  circulatingSupply: string;
}

export interface CoinAllTimeHighData {
  price: string;
  timestamp: number;
}

export interface CoinInterface {
  uuid: string;
  symbol: string;
  name: string;
  description: string;
  color: string;
  iconUrl: string;
  supply: CoinSupplyData;
  volume24h: string;
  marketCap: string;
  fullyDilutedMarketCap: string;
  price: string;
  priceAt: number;
  change: string;
  rank: number;
  sparkline: string[];
  allTimeHigh: CoinAllTimeHighData;
  lowVolume: boolean;
  listedAt: number;
  hasContent: boolean;
  notices: any;
  tags: string[];
  createdAt: string
}

