import { GeneralInfoInterface } from "./GeneralInfo.interface";


export interface UserInterface extends GeneralInfoInterface {
  username: string,
  country: string,
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Not Specified',
  phone?: string,
  confirmedAccount: boolean,
  confirmCode: string
}