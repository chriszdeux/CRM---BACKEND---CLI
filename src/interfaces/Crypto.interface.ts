export interface CryptoInterface {
  idCrypto: string;
  name: string;
  symbol: string;
  currentPrice: number;
  marketCap: number;
  totalVolume24h: number;
  circulatingSupply: number;
  maxSupply?: number;
  allTimeHigh?: number;
  athDate?: string;
  marketRank: number;
  website: string;
  description: string;
  logoImage: string;
  whitepaper?: string;
  tags?: string[];
  createdAt: string;
  __v?: number;
}
