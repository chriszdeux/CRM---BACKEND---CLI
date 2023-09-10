import { GeneralInfoInterface } from "./GeneralInfo.interface";
import { TransactionInterface } from "./index";


export interface UserInterface extends GeneralInfoInterface {
  userId?: string, 
  username: string,
  country: string,
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Not Specified',
  phone?: string,
  confirmedAccount: boolean,
  confirmCode: string,
  credits: number,
  portfolio: UserPortfolio
  transactions: string[] ,
  __v?: string
}

export interface UserPortfolio {
  crypto: Array<{
    id: string;
    amount: number;
    name?: string;
    totalValue?: number;
    logoImg?: string;
    _id?: string
  }>;
}
