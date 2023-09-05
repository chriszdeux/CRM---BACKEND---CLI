
export interface coinSupplyData {
  confirmed: boolean;
  supplyAt: number;
  maxSupply: string;
  totalSupply: string;
  circulatingSupply: string;
}

export interface coinAllTimeHighData {
  price: string;
  timestamp: number;
}

export interface coinInterface {
  uuid: string;
  symbol: string;
  name: string;
  description: string;
  color: string;
  iconUrl: string;
  supply: coinSupplyData;
  volume24h: string;
  marketCap: string;
  fullyDilutedMarketCap: string;
  price: string;
  priceAt: number;
  change: string;
  rank: number;
  sparkline: string[];
  allTimeHigh: coinAllTimeHighData;
  lowVolume: boolean;
  listedAt: number;
  hasContent: boolean;
  notices: any;
  tags: string[];
  createdAt: string
}

