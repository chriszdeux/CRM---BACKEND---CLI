import { generalInfoInterface } from "./GeneralInfo.interface";


export interface userInterface extends generalInfoInterface {
  username: string,
  country: string,
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Not Specified',
  phone?: string,
  confirmedAccount: boolean,
  confirmCode: string,
  credits: number,
  portfolio: userPortfolio
}

export interface userPortfolio {
  crypto: Array<{
    id: string;
    name: string;
    amount: number;
  }>;
}
